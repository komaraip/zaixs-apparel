<?php 
include "../../connect.php";

$result = mysqli_query($conn,"SELECT * FROM accessories WHERE id='$_GET[id]'");

$data = mysqli_fetch_assoc($result);

$fotoproduk = $data['barang'];
if(file_exists("../../assets/images/$fotoproduk"))
{
    unlink("../../assets/images/$fotoproduk");
}

mysqli_query($conn,"DELETE FROM accessories WHERE id='$_GET[id]'");

echo "<script>alert('produk terhapus');</script>";
echo "<script>location='access.php';</script>";