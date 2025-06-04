import prisma from "../../../../../../lib/prisma";

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  totalBrands: number;
  revenueGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  productsGrowth: number;
  brandsGrowth: number;
}

export interface ChartData {
  date: string;
  revenue: number;
  orders: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Get current date range (last 30 days)
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);
    
    // Get previous period (30 days before that)
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(currentDate.getDate() - 60);    // Current period stats
    const [currentRevenue, currentOrders, currentCustomers, currentProducts, currentBrands] = await Promise.all([
      // Total revenue from last 30 days
      prisma.order.aggregate({
        where: {
          create_at: {
            gte: thirtyDaysAgo,
          },
          status: {
            not: 'pending'
          }
        },
        _sum: {
          total: true,
        },
      }),
      
      // Total orders from last 30 days
      prisma.order.count({
        where: {
          create_at: {
            gte: thirtyDaysAgo,
          },
        },
      }),
      
      // Total customers (users with role customer) from last 30 days
      prisma.user.count({
        where: {
          role: 'customer',
          create_at: {
            gte: thirtyDaysAgo,
          },
        },
      }),
      
      // Total products
      prisma.product.count(),
      
      // Total brands
      prisma.brand.count(),
    ]);    // Previous period stats for growth calculation
    const [previousRevenue, previousOrders, previousCustomers, previousProducts, previousBrands] = await Promise.all([
      // Revenue from 60-30 days ago
      prisma.order.aggregate({
        where: {
          create_at: {
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo,
          },
          status: {
            not: 'pending'
          }
        },
        _sum: {
          total: true,
        },
      }),
      
      // Orders from 60-30 days ago
      prisma.order.count({
        where: {
          create_at: {
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo,
          },
        },
      }),
      
      // Customers from 60-30 days ago
      prisma.user.count({
        where: {
          role: 'customer',
          create_at: {
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo,
          },
        },
      }),
      
      // Previous period products (30 days ago)
      prisma.product.count({
        where: {
          create_at: {
            lt: thirtyDaysAgo,
          },
        },
      }),
      
      // Previous period brands (30 days ago)
      prisma.brand.count({
        where: {
          create_at: {
            lt: thirtyDaysAgo,
          },
        },
      }),
    ]);

    // Calculate growth percentages
    const calculateGrowth = (current: number, previous: number): number => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };    const totalRevenue = Number(currentRevenue._sum.total) || 0;
    const totalOrders = currentOrders || 0;
    const totalCustomers = currentCustomers || 0;
    const totalProducts = currentProducts || 0;
    const totalBrands = currentBrands || 0;

    const previousRevenueValue = Number(previousRevenue._sum.total) || 0;
    const previousOrdersValue = previousOrders || 0;
    const previousCustomersValue = previousCustomers || 0;
    const previousProductsValue = previousProducts || 0;
    const previousBrandsValue = previousBrands || 0;

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      totalBrands,
      revenueGrowth: calculateGrowth(totalRevenue, previousRevenueValue),
      ordersGrowth: calculateGrowth(totalOrders, previousOrdersValue),
      customersGrowth: calculateGrowth(totalCustomers, previousCustomersValue),
      productsGrowth: calculateGrowth(totalProducts, previousProductsValue),
      brandsGrowth: calculateGrowth(totalBrands, previousBrandsValue),
    };  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalProducts: 0,
      totalBrands: 0,
      revenueGrowth: 0,
      ordersGrowth: 0,
      customersGrowth: 0,
      productsGrowth: 0,
      brandsGrowth: 0,
    };
  }
}

export async function getChartData(): Promise<ChartData[]> {
  try {
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);

    // Get orders grouped by date for the last 30 days
    const orders = await prisma.order.findMany({
      where: {
        create_at: {
          gte: thirtyDaysAgo,
        },
      },
      select: {
        create_at: true,
        total: true,
      },
      orderBy: {
        create_at: 'asc',
      },
    });

    // Group orders by date
    const chartDataMap = new Map<string, { revenue: number; orders: number }>();
    
    // Initialize all dates in the range with 0 values
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(currentDate.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      chartDataMap.set(dateString, { revenue: 0, orders: 0 });
    }

    // Populate with actual data
    orders.forEach(order => {
      const dateString = order.create_at.toISOString().split('T')[0];
      const existing = chartDataMap.get(dateString) || { revenue: 0, orders: 0 };
      existing.revenue += Number(order.total);
      existing.orders += 1;
      chartDataMap.set(dateString, existing);
    });

    // Convert map to array
    const chartData: ChartData[] = Array.from(chartDataMap.entries()).map(([date, data]) => ({
      date,
      revenue: data.revenue,
      orders: data.orders,
    }));

    return chartData;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return [];
  }
}

export async function getRecentOrders() {
  try {
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        create_at: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        Product: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
              },
            },
          },
        },
      },
    });

    return recentOrders.map(order => ({
      id: order.id,
      customer_name: order.user.name,
      customer_email: order.user.email,
      total: Number(order.total),
      status: order.status,
      created_at: order.create_at,
      products: order.Product?.map(item => ({
        name: item.product.name,
        image: item.product.images[0],
      })) || [],
    }));
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    return [];
  }
}
