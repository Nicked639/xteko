function lastImage() {
  $photo.fetch({
    count: 1,
    handler: function(image) {
      if (image) {
        compressImage(image[0]);
      } else {
        $ui.loading(false);
            $ui.error("图像读取失败");
      }
    }
  });
}

function pickImage() {
  $photo.pick({
    handler: function(resp) {
      var image = resp.image;
      if (image) {
        compressImage(image);
      } else {
        $ui.loading(false);
            $ui.error("图像读取失败");
      }
    }
  });
}

function compressImage(image) {
  
    //        alert($props(image[0]))
    $input.text({
      type: $kbType.number,
      placeholder: "输入压缩到比例 0～100",
      handler: function(num1) {
        let width = (image.size.width * num1) / 100;
        let height = (image.size.height * num1) / 100;
        let resized = image.resized($size(width, height));
        $input.text({
          type: $kbType.number,
          placeholder: "输入压缩后质量 0～100",
          handler: function(num2) {
            let jpg = resized.jpg(num1 / 100);

            $photo.save({
              data: jpg,
              handler: function(success) {
                if (success) $ui.toast("压缩成功");
              }
            });
          }
        });
      }
    });
  
}
function run(){
  $ui.menu({
    items: ["最后一张","相册选择"],
    handler: function(title, idx) {
      if(idx==0) lastImage()
      else if(idx==1) pickImage()
    }
  });
}

module.exports={
  run:run
}
