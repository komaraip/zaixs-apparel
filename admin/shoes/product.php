<div class="col-md-12 col-sm-12 col-xs-12">
      <div class="panel panel-default">
            <div class="panel-heading">
                DATA
            </div>
            <div class="panel-body">
                  <div class="table-responsive">
                  <table class="table table-striped table-bordered table-hover">
                        <thead>
                              <tr>
                                    <th>No</th>
                                    <th>Nama</th>
                                    <th>Foto</th>
                                    <th>Harga</th>
                                    <th>Stok</th>
                                    <th>Jenis</th>
                                    <th>Aksi</th>
                              </tr>
                        </thead>
                        <tbody>
                        <!-- Query Data -->
                        <?php $result = mysqli_query ($conn,"SELECT * FROM shoes ORDER BY id ASC"); ?>
                        <?php $i = 1;
                              while ($data = mysqli_fetch_assoc($result)) {
                        ?>
                        <!-- End of Query -->
                              <tr>
                                    <td><?= $i ?></td>
                                    <td><?= $data['nama'] ?></td>
                                    <td>
                                        <img src="../../assets/images/<?= $data['barang']; ?>" width="90">
                                    </td>
                                    <td><?= $data['harga'] ?></td>
                                    <td><?= $data['stok'] ?></td>
                                    <td><?= $data['jenis'] ?></td>
                                    <td>
                                        <a href="shoes.php?halaman=ubahproduk&id=<?= $data['id']; ?>">EDIT</a>
                                        <a href="shoes.php?halaman=hapusproduk&id=<?= $data['id']; ?>" onclick="return confirm('Yakin Dihapus???')">HAPUS</a>
                                    </td>
                              </tr>
                        <?php $i++; } ?>
                        </tbody>
                  </table>
                  </div>
            </div>
      </div>
</div>