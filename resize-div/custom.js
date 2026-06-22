$(function () {
    const $container = $("#custom_container");
    const $left = $("#left");
    const $right = $("#right");
    const $drag = $("#drag");
    const $gapInput = $("#gapInput");
    const $containerMaxWidthInput = $("#custom_containerMaxWidthInput");
    const $leftClassInput = $("#leftClassInput");
    const $rightClassInput = $("#rightClassInput");
    const $widthInfo = $("#widthInfo");
    const $styleTag = $("#dynamic-styles");
    const $add_parent_class = $("#add-parent-class");
    let gap = parseInt($gapInput.val(), 10);
    let leftClass = $leftClassInput.val();
    let rightClass = $rightClassInput.val();
    let add_parent_class = $add_parent_class.val();

    function success_message(message = "Copied successfully!") {
        const msgBox = $("#successMessage");
        msgBox.text(message).fadeIn(300);
        setTimeout(() => {
            msgBox.fadeOut(300);
        }, 2000);
    }
    function layoutPanels(leftPercent, rightPercent) {
        $container.css("gap", gap + "px");
        const containerWidth = $container.width();
        const availableWidth = containerWidth - gap;
        const leftWidthPx = (leftPercent / 100) * availableWidth;
        const rightWidthPx = (rightPercent / 100) * availableWidth;
        $left.css({ width: leftWidthPx + "px" });
        $right.css({ width: rightWidthPx + "px" });
        $('.left_width').html(leftWidthPx.toFixed(2));
        $('.right_width').html(rightWidthPx.toFixed(2));
        $drag.css({ left: leftWidthPx + gap + "px" });
        $widthInfo.text(`Left: ${leftPercent.toFixed(2)}% | Right: ${rightPercent.toFixed(2)}%`);
        const parentClass = $add_parent_class.val().trim() || "custom_container";

        const css = `
.${parentClass} {
  display: flex;
  flex-wrap: wrap;
  gap: ${gap}px;
}
.${leftClass} {
  width: ${leftPercent.toFixed(2)}%;
  flex: 0 0 auto;
}
.${rightClass} {
  width: ${rightPercent.toFixed(2)}%;
  flex: 0 0 auto;
}`;
        $styleTag.html(css);
    }

    $gapInput.on("input", function () {
        gap = parseInt(this.value, 10);
        updateLayout();
    });
    $containerMaxWidthInput.on("input", function () {
        $container.css("max-width", this.value);
    });
    function updateLayout() {
        const containerWidth = $container.width();
        const leftWidth = $left.outerWidth();
        const rightWidth = $right.outerWidth();
        const leftPercent = (leftWidth / (containerWidth - gap)) * 100;
        const rightPercent = 100 - leftPercent;
        layoutPanels(leftPercent, rightPercent);
    }
    $drag.on("mousedown", function () {
        $(document).on("mousemove", resize);
        $(document).on("mouseup", stopResize);
    });
    function resize(e) {
        const offsetLeft = $container.offset().left;
        const containerWidth = $container.width();
        let newLeft = e.clientX - offsetLeft;
        const totalAvailable = containerWidth - gap;
        newLeft = Math.max(50, Math.min(totalAvailable - 50, newLeft));
        const leftPercent = (newLeft / totalAvailable) * 100;
        const rightPercent = 100 - leftPercent;
        layoutPanels(leftPercent, rightPercent);
    }
    function stopResize() {
        $(document).off("mousemove", resize);
        $(document).off("mouseup", stopResize);
    }
    window.applyClasses = function () {
        $("#copyHtmlBtn ,#copyCssBtn").removeAttr("disabled")
        const new_add_parent_class = $add_parent_class.val().trim() || "custom_container";
        const newLeft = $leftClassInput.val().trim() || "default-left";
        const newRight = $rightClassInput.val().trim() || "default-right";
        $left.removeClass().addClass(newLeft);
        $right.removeClass().addClass(newRight);
        $("#custom_container").removeClass().addClass("custom_container").addClass(add_parent_class);
        leftClass = newLeft;
        rightClass = newRight;
        updateLayout();
    };
    window.copyHTML = function () {

        const parentClass = $("#add-parent-class").val().trim() || "custom_container";
        const leftClass = $("#leftClassInput").val().trim() || "left";
        const rightClass = $("#rightClassInput").val().trim() || "right";
        const htmlSnippet =
            `<div class="${parentClass}">
  <div class="${leftClass}"></div>
  <div class="${rightClass}"></div>
</div>`;
        navigator.clipboard.writeText(htmlSnippet).then(() => {
            success_message("html copied to clipboard!");
        }).catch(err => {
            alert("Failed to copy HTML: " + err);
        });
        $("#copyHtmlBtn").attr("disabled", true);
    };
    window.copyCSS = function () {
        const css = $styleTag.text().trim();
        const escapedCss = css.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        $("#tt-css-output").html(escapedCss);
        $(".tt").show();
        $(".overlay").show();
        const currentParentClass = $("#add-parent-class").val().trim() || "custom_container";
    };
    window.copyCSSToClipboard = function () {
        const css = $styleTag.text().trim();
        navigator.clipboard.writeText(css).then(() => {
        }).catch(err => {
            alert("Failed to copy: " + err);
        });
        setTimeout(function () {
            $(".tt").fadeOut(200);
            $('.overlay').fadeOut(200)
        }, 200)
        $("#copyCssBtn").attr("disabled", true);
        success_message("css copied to clipboard!");
    };
    window.closeCSSPopup = function () {
        $(".tt").fadeOut(200);
        $('.overlay').fadeOut(200)
    };
    window.overlay = function () {
        $(".tt").fadeOut(200);
        $('.overlay').fadeOut(200);
    }
    layoutPanels(50, 50);
});
