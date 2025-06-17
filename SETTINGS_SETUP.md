# Settings Page Setup Instructions

## Current Status
✅ Database schema updated with `avatar` field
✅ Settings page created at `/settings`
✅ Settings form component created
✅ API routes created for:
  - Update profile (`/api/user/update-profile`)
  - Update password (`/api/user/update-password`) 
  - Update avatar (`/api/user/update-avatar`) - temporarily disabled
✅ UserDropdown component updated with avatar support
✅ Sign-out API endpoint ready
✅ Auth system temporarily configured without avatar field

## Steps to Complete Setup

### 1. Run Database Migration (Required)
When your database connection is available, run:
```bash
npx prisma migrate dev --name add_user_avatar
```

### 2. Generate Prisma Client
After the migration, regenerate the Prisma client:
```bash
npx prisma generate
```

### 3. Enable Avatar in Auth System
After successful migration, uncomment the avatar fields in:
`src/lib/auth.ts` (lines 23 and 58)

### 4. Enable Avatar Updates
Uncomment the avatar update code in:
`src/app/api/user/update-avatar/route.ts` (lines 69-74)

### 5. Update Navbar Avatar
Update the navbar to pass the actual avatar URL:
```tsx
avatarUrl={user.avatar || null}
```

### 6. Create Uploads Directory
Ensure the uploads directory exists:
```bash
mkdir -p public/uploads/avatars
```

## Features Currently Working
- ✅ Settings page navigation
- ✅ Profile information updates (name, email)
- ✅ Password changes
- ✅ User dropdown with logout
- ⏳ Avatar uploads (after migration)

## After Migration Complete
All features will be fully operational including:
- Profile photo uploads
- Avatar display in navbar
- Complete user settings management

## Features Included

### Settings Page (`/settings`)
- **Profile Information**: Update name and email
- **Change Password**: Secure password update with current password verification
- **Profile Photo**: Upload and display custom avatar (5MB max, image files only)

### User Dropdown (Navbar)
- Displays user's first name and avatar
- Clickable dropdown with:
  - Settings link
  - Log out functionality
- Click outside to close

### Security Features
- All API routes require customer authentication
- Password updates require current password verification
- Email uniqueness validation
- File type and size validation for avatars
- Secure file upload with timestamp-based naming

## File Locations
- Settings Page: `src/app/(customer)/settings/page.tsx`
- Settings Form: `src/app/(customer)/settings/_components/settings-form.tsx`
- User Dropdown: `src/app/(customer)/(index)/_components/user-dropdown.tsx`
- API Routes: `src/app/api/user/update-*`

## Database Schema
```prisma
model User {
  id       Int      @id @default(autoincrement())
  name     String   @db.VarChar(255)
  email    String   @unique @db.VarChar(255)
  password String   @db.VarChar(255)
  role     RoleUser @default(customer)
  avatar   String?  @db.VarChar(255)  // New field added

  orders    Order[]
  sessions  Session[]

  create_at  DateTime @default(now())
  updated_at DateTime @updatedAt
}
```

Once the migration is complete, all functionality will be fully operational!
