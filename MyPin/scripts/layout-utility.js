function isIphoneX() {
  return Math.abs($device.info.screen.height - 812.0) < 0.01;
}

function dynamicInsets() {
  var iphoneX = isIphoneX();
  return { left: 0, right: 0, top: (iphoneX ? 22 : 0), bottom: (iphoneX ? 28 : 0) }
}

function textShadows(view,color) {
    let layer = view.runtimeValue().invoke("layer");
    layer.invoke("setShadowOpacity", 0.35);
    layer.invoke("setShadowOffset", $size(0, 2));
    layer.invoke(
        "setShadowColor",
        $color(color)
        .runtimeValue()
        .invoke("CGColor")
    );
}

module.exports = {
  isIphoneX: isIphoneX,
  dynamicInsets: dynamicInsets,
  textShadows:textShadows
};
