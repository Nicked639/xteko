let p = Math.PI
//✅
function checkMark(n,r) {
  return {
    type: "canvas",
    props: {
      userInteractionEnabled: false
    },
    layout: $layout.fill,
    events: {
      draw: function(view, ctx) {
        var m = n * 0.5;
        var s = r * Math.SQRT1_2;
        var cX = view.frame.width * 0.5;
        var cY = view.frame.height * 0.5;
        var xa = cX - m * 3 - s;
        var xb = cX - m - s;
        var xd = cX + m * 3 + s;
        var xf = cX - m;
        var xg = cX - m * 3 + s;
        var ya = cY + s;
        var ybc = cY + n + s;
        var yd = cY - n + s;
        var yf = cY + n - s * 2;
        var yg = cY - s;
        ctx.fillColor = $color("tint");
        ctx.setAlpha(0.9);
        ctx.moveToPoint(xa, ya);
        ctx.addLineToPoint(xb, ybc);
        ctx.addArc(cX - m, cY + n, r, p * 0.75, p * 0.25, true);
        ctx.addLineToPoint(xd, yd);
        ctx.addArc(cX + m * 3, cY - n, r, p * 0.25, p * -0.75, true);
        ctx.addLineToPoint(xf, yf);
        ctx.addLineToPoint(xg, yg);
        ctx.addArc(cX - m * 3, cY, r, Math.PI * -0.25, Math.PI * -1.25, true);
        ctx.fillPath();
      }
    }
  };
}
//❌
function cross(n,r) {
  return {
    type: "canvas",
    props: {
      userInteractionEnabled: false
    },
    layout: $layout.fill,
    events: {
      draw: function(view, ctx) {
        var s = r * Math.SQRT1_2;
        var cX = view.frame.width * 0.5;
        var cY = view.frame.height * 0.5;
        var xa = cX - n - s;
        var xc = cX + n + s;
        var ya = cY - n + s;
        var yc = cY + n - s;
        ctx.fillColor = $color("tint");
        ctx.setAlpha(0.9);
        ctx.moveToPoint(xa, ya);
        ctx.addArc(cX - n, cY - n, r, p * 0.75, p * 1.75, false);
        ctx.addLineToPoint(xc, yc);
        ctx.addArc(cX + n, cY + n, r, p * -0.25, p * 0.75, false);
        ctx.fillPath();
        ctx.moveToPoint(xa, yc);
        ctx.addArc(cX - n, cY + n, r, p * 1.25, p * 0.25, true);
        ctx.addLineToPoint(xc, ya);
        ctx.addArc(cX + n, cY - n, r, p * 0.25, p * -0.75, true);
        ctx.fillPath();
      }
    }
  };
}
//↩️↪️
function arrow(n,r,i) {
  return {
    type: "canvas",
    props: {
      userInteractionEnabled: false
    },
    layout: $layout.fill,
    events: {
      draw: function(view, ctx) {
        var cX = view.frame.width * 0.5;
        var cY = view.frame.height * 0.5;
        ctx.scaleCTM(i, 1);
        ctx.translateCTM(i == 1 ? 0 : -cX * 2, 0);
        var s = r * Math.SQRT1_2;
        var t = r * 0.5;
        var m = n * 0.5;
        var xde = cX + t - m;
        var xf = cX - m - t * 3;
        var ydf = cY - r - s * 2 + n;
        ctx.fillColor = $color("tint");
        ctx.setAlpha(0.9);
        ctx.moveToPoint(xf, ydf);
        ctx.addArc(cX - m * 3 - t, cY, r, p * -0.25, p * 0.75, true);
        ctx.addArc(cX - m - t, cY + n, r, p * 0.75, p * 0.25, true);
        ctx.addArc(cX + m - t, cY, r, p * 0.25, p * -0.75, true);
        ctx.addLineToPoint(xde, ydf);
        ctx.addArc(cX + m - t, cY, n - r, p * 1, p * 0, false);
        ctx.addArc(cX + m * 3 - t, cY, r, p * 1, p * 0, true);
        ctx.addArc(cX + m - t, cY, n + r, p * 0, p * 1, true);
        ctx.fillPath();
      }
    }
  };
}
//◀️▶️
function nav(n,r) {
  return {
    type: "canvas",
    props: {
      userInteractionEnabled: false
    },
    layout: $layout.fill,
    events: {
      draw: function(view, ctx) {
        var m = n * 0.5;
        var s = r * Math.SQRT1_2;
        var cX = view.frame.width * 0.5;
        var cY = view.frame.height * 0.5;
        var xd = cX - m + s * 2;
        var xag = cX - m - s;
        var ya = cY - s;
        ctx.fillColor = $color("tint");
        ctx.setAlpha(0.9);
        ctx.moveToPoint(xag, ya);
        ctx.addArc(cX + m, cY - n, r, p * -0.75, p * 0.25, false);
        ctx.addLineToPoint(xd, cY);
        ctx.addArc(cX + m, cY + n, r, p * -0.25, p * 0.75, false);
        ctx.addArc(cX - m, cY, r, p * 0.75, p * 1.25, false);
        ctx.fillPath();
      }
    }
  };
}
//🔺🔻
function triangle(n, id, hidden,le) {
  return {
    type: "canvas",
    props: {
      id: id,
      hidden: hidden
    },
    layout: function(make, view) {
      le.textShadows(view, "tint");
      make.edges.inset(0);
    },
    events: {
      draw: function(view, ctx) {
        var cX = view.frame.width * 0.5;
        var cY = view.frame.height * 0.5;
        var s = n * 0.5;
        var t = n * Math.sqrt(3 / 16);
        ctx.fillColor = $color("tint");
        ctx.setAlpha(0.9);
        ctx.moveToPoint(cX + s, cY - t);
        ctx.addLineToPoint(cX - s, cY - t);
        ctx.addLineToPoint(cX, cY + t);
        ctx.fillPath();
      }
    }
  };
}

module.exports={
  checkMark:checkMark,
  cross:cross,
  arrow:arrow,
  nav:nav,
  triangle:triangle
}
