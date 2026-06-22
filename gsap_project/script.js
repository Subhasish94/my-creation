$(document).on('input change', '#get_color', function () {
    function hexToRgba(hex, alpha = 1) {
        hex = hex.replace(/^#/, '');
        let bigint = parseInt(hex, 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        // console.log(`Value of r: ${r}`);
        // console.log(`Value of g: ${g}`);
        // console.log(`Value of b: ${b}`);
        // console.log(`Value of alpha: ${alpha}`);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    var hexColor = $(this).val();
    var hex_code = $(this).val();
    var fill_color = hexToRgba(hexColor, 0.2);
    $('#slider_value').html(fill_color);
    $('#get_color_hex').html(hex_code);
    $('.set_color p').html(hex_code);
    $('.set_color').css({ 'background-color': fill_color });
    $('.heading_contrnt > h1').css({ 'color': fill_color });

    $('#copy_btn').click(function () {
        var a = $('.set_color p').text();
        if (a !== "") {
            navigator.clipboard.writeText(a)
            $('.copyed').css({
                'opacity': '1', 'color': fill_color
            });
            setTimeout(function () {
                $('.copyed').css({ 'opacity': '0', })
                $('#copy_btn').css({ 'opacity': '0' })
            }, 800)
        }
        else {
            alert("blank content")
        }
    });
});
$(document).on('change', '#get_color', function () {
    $('#copy_btn').css({ 'opacity': '1' })
})

// ======= inspect off start====

// document.addEventListener('contextmenu', function(event) {
//     event.preventDefault();
// });
// document.onkeydown = function(e) {
//     if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "U")) {
//         return false;
//     }
// };
// ======= inspect off end ====


$(document).ready(function () {
    const $slider = $('#mySlider');
    const $label = $('.slider-label');
    $slider.on('input', function () {
        const value = $(this).val();
        console.log(value)
        $label.text(value);
    });
});


// ============== box-shadow start ================
if ($('.box-shadow').length > 0) {
    $(document).ready(function () {
        let shadow_type = "";
        function hexToRgba_convert(hex, alpha = 1) {
            hex = hex.replace(/^#/, '');
            let bigint = parseInt(hex, 16);
            let r = (bigint >> 16) & 255;
            let g = (bigint >> 8) & 255;
            let b = bigint & 255;
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        function updateBoxShadow() {
            var horizontal_value = $('#horizontal').val();
            $('.horizontal_set_value').html(horizontal_value);
            var vertical_value = $('#vertical').val();
            $('.vertical_set_value').html(vertical_value);
            var blur_value = $('#blur').val();
            $('.blur_set_value').html(blur_value);
            var spread_value = $('#spread').val();
            $('.spread_set_value').html(spread_value);
            var shadowHex = $('#Shadow').val();
            $('.Shadow_set_value').html(shadowHex);
            var opacity = $('#opacity').val();
            $('.opacity_set_value').html(opacity);
            let fill_color = hexToRgba_convert(shadowHex, opacity);
            $('.rgb_value').html(fill_color);
            $('.box-shadow-result').css('box-shadow', `${shadow_type} ${horizontal_value}px ${vertical_value}px ${blur_value}px ${spread_value}px ${fill_color}`);
            var final_result = `${shadow_type} ${horizontal_value}px ${vertical_value}px ${blur_value}px ${spread_value}px ${fill_color}`;
            $('.result').html(final_result)
        }
        $('#shadow_type').change(function () {
            if ($(this).is(':checked')) {
                $('.shadow_type').show();
                shadow_type = "inset";
            } else {
                $('.shadow_type').hide();
                shadow_type = "";
            }
            updateBoxShadow();
        });
        updateBoxShadow();
        $(document).on('input change', '.slider', updateBoxShadow);
    });

}
// ============== box-shadow end ================

// ============== slider-control start ================
// $(document).ready(function () {
//     function slider_fun() {
//         let slides_PerView = $('#slides_PerView_get').val();
//         $('.slides_PerView_set').html(slides_PerView);
//         let spaceBetween = $('#spaceBetween').val();
//         $('.spaceBetween_set').html(spaceBetween);
//     }
//     $(document).ready(function () {
//         // Function to handle slider changes
//         function slider_fun() {
//             let disableOnInteraction = $('#disableOnInteraction_get').val();
//             // You can use this disableOnInteraction value in your slider logic
//             console.log(disableOnInteraction)
//         }
//         // Handle dropdown change
//         $('#disableOnInteraction_get').on('change', function () {
//             slider_fun();
//             let selectedValue = $(this).val(); // Get the selected value

//             if (selectedValue === 'true') {
//                 alert('True selected');
//             } else {
//                 alert('False selected');
//             }
//         });
//         // Call slider_fun initially to apply default settings
//         slider_fun();
//     });
//     $('#delay_get').on('input change', function () {
//         slider_fun();
//         let t = $(this).val()
//         $('.delay_set').html(t)
//     })
//     $('#auto_play').change(function () {
//         slider_fun();
//         if ($(this).is(':checked')) {
//             $('.autoplay').show(500)
//         }
//         else {
//             $('.autoplay').hide(500)
//         }
//     });
//     slider_fun();
//     $(document).on('input change', '.slider', slider_fun);

// });


$(document).ready(function () {
    function slider_fun() {
        let slides_PerView = $('#slides_PerView_get').val();
        $('.slides_PerView_set').html(slides_PerView);
        let spaceBetween = $('#spaceBetween').val();
        $('.spaceBetween_set').html(spaceBetween);
        let disableOnInteraction = $('#disableOnInteraction_get').val();
        $('.disableOnInteraction_set').html(disableOnInteraction);
    }
    $('#disableOnInteraction_get').on('change', function () {
        slider_fun();
        let selectedValue = $(this).val();
    });
    $('#delay_get').on('input change', function () {
        slider_fun();
        let t = $(this).val()
        $('.delay_set').html(t)
    })
    $('#auto_play').change(function () {
        slider_fun();
        if ($(this).is(':checked')) {
            $('.autoplay').slideDown(500)
        }
        else {
            $('.autoplay').slideUp(500)
        }
    });
    $('#add_breakpoint').change(function () {
        slider_fun();
        if ($(this).is(':checked')) {
            $('.breakpoind').slideDown(500)
        }
        else {
            $('.breakpoind').slideUp(500)
        }

    });
    slider_fun();
    $(document).on('input change', '.slider', slider_fun);
    $('#add_breakpoint_btn').click(function () {
        var add_new_breakpoint = $('#add_new-breakpoint').val()
        if (add_new_breakpoint !== "" && add_new_breakpoint !== undefined) {
            function clone_function() {
                $('.breakpoind').prepend(`<div class="each_break_point bg-success">
                                    <p>viewport <span class="breakpoint_set">${add_new_breakpoint + 'px'}</span></p>
                                    <label > slides Per View: <span class="slides_Per_View${add_new_breakpoint}_set">1</span></label>
                                    <input type="range" class="slider" id="slides_Per_View${add_new_breakpoint}_get" value="1" min="1" max="20" step="1">
                                    <label class="">spaceBetween: <span class="spaceBetween${add_new_breakpoint}_set">0</span>px</label>
                                    <input type="range" class="slider" id="spaceBetween${add_new_breakpoint}_get" value="0" min="0" max="50" step="1">
                                    <span class="btn btn-danger remove-breakpoint" id="remove${add_new_breakpoint}">remove${add_new_breakpoint}</span>
                                </div>`)
            }
        }
        else {
            alert("please insert input")
        }
        clone_function();
        $('#add_new-breakpoint').val("")
    });
    $(document).on('click', '.remove-breakpoint', function () {
        // Remove the specific breakpoint
        $(this).closest('.each_break_point').remove();
        alert("Breakpoint removed!");
    });

});







