<?php 

if (isset($_POST['save'])) {
      $nama = $_POST['nama'];
      $barang = uploadImage();
      $harga = $_POST['harga'];
      $stok = $_POST['stok'];
  
      if (!$barang) {
          return false;
      }
  
      $result = mysqli_query($conn,
      "INSERT INTO accessories (nama,barang,harga,stok) VALUES 
      ('$nama','$barang','$harga','$stok')");
  
      echo  "<div class='alert alert-info'>Data Tersimpan</div>";
      echo  "<meta http-equiv='refresh' content='1;url=access.php'>";
  }

?>

<!-- HTML FORM -->
<div class="col-md-12 col-sm-12 col-xs-12">
      <div class="panel panel-default">
            <div class="panel-heading">
                  Tambah Item
            </div>

            <div class="panel-body">
                  <form method="POST" enctype="multipart/form-data">
                        <div class="form-group">
                              <label>Nama</label>
                              <input type="text" class="form-control" name="nama">
                        </div>
                        <div class="form-group">
                              <label>Harga (Rp)</label>
                              <input type="number" class="form-control" name="harga">
                        </div>
                        <div class="form-group">
                              <label>Stok</label>
                              <input type="text" class="form-control" name="stok">
                        </div>
                        <div class="form-group">
                              <label>Foto</label>
                              <input type="file" class="form-control" name="barang">
                        </div>
                        <button class="btn btn-primary" name="save">Simpan</button>
                  </form>
            </div>
      </div>
</div>
<?php 

function uploadImage(){
      $namaFile = $_FILES['barang']['name'];
      $sizeFile = $_FILES['barang']['size'];
      $error = $_FILES['barang']['error'];
      $tmpName = $_FILES['barang']['tmp_name'];

      //mengecek apakah ada file yang di upload
      if ($error === 4) {
          echo "<script>alert(\"Silahkan Upload gambar\");</script>";
          return false;
      }
      
      //mengecek extensi file gambar yang diupload
      $allowextensions = ['jpg','jpeg','png'];
      $extension = explode(".",$namaFile); //tricky untuk memecah nama file pada titik untuk mengetahui extensions yang dipakai
      $extension = strtolower/*memaksa string menjadi kecil semua kemudian diambil*/
      (end($extension));//mengambil text atau nama file paling belakang setelah dipecah(mengambil nama extensinya)

      if (!in_array/*mengecek isi array pertama sama seperti array kedua*/($extension,$allowextensions)) {
          echo "<script>alert(\"extensi yang diperbolehkan jpg,jpeg,png\");</script>";
          return false;
      }

      //mengecek ukuran file
      if ($sizeFile > 1000000) {
          echo "<script>alert('ukuran file terlalu besar')</script>";
          return false;
      }

      //mengganti nama file dengan random number agar tidak terjadi tabrakan ketika penamaan file di server

      $newname = uniqid().".".$extension;//function uniqid untuk memberikan id uniq 

      move_uploaded_file($tmpName, '../../assets/images/'. $newname);

      return $newname;
}

?>