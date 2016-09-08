/**
 * kendobox.js
 *
 * reggieqiao@gmail.com
 *
 * https://github.com/reggieqiao/kendobox
 */

// 判断是否有父页面，有iframe时的情况
_p = parent || this; 
_$ = parent.$ || $;

(function($){

    $.kendobox = {
        alert: function(message, callback, options){

            // alert 模板
            var tpl_html = '<div style="height: 80%;">' + message + '</div>';
            tpl_html += '<div class="text-right">';
            tpl_html += '<a class="k-button kendo-btn-ok k-primary">确定</a>'; // 默认按钮
            tpl_html += '</div>';

            // Kendo UI Window 遮罩层自定义参数(这里可以添加你需要的参数)
            var custom_options = {
                width: options && options.width || 380,
                height: options && options.height || 'auto',
                title: options && options.title || '',
                content: {
                    template: tpl_html // 获取 alert 模板
                },
                close: function () {
                    $.kendobox.window.destroy(); // 销毁遮罩层
                }
            }

            var summary_options = $.extend({}, $.kendobox.default_options, options, custom_options); // 合并自定义参数

            $.kendobox.window = $("<div></div>").kendoWindow(summary_options).data("kendoWindow"); // 初始化遮罩层

            $('.kendo-btn-ok').click(function () {
                if (callback) callback(); // 确认按钮执行回调函数
                $.kendobox.window.destroy(); // 销毁弹遮罩层
            });

            $.kendobox.window.open().center(); // 弹出遮罩层
        },
        confirm: function(message, callback, options){

            // alert 模板
            var tpl_html = '<div style="height: 80%;">' + message + '</div>';
            tpl_html += '<div class="text-right">';
            if (options && options.button) { // 生成自定义按钮
                for (var i = 0; i < options.button.length; i++) {
                    tpl_html += '<a class="k-button ' + (options.button[i].focus ? 'k-primary' : '') + ' kendo-btn-' + options.button[i].class + '" data-index=' + i + '>'
                    + options.button[i].name + '</a>&nbsp;&nbsp;';
                }
            } else { // 默认按钮
                tpl_html += '<a class="k-button kendo-btn-ok k-primary">确定</a>&nbsp;&nbsp;';
                tpl_html += '<a class="k-button kendo-btn-cancel">取消</a>';
            }
            tpl_html += '</div>';

            // Kendo UI Window 遮罩层自定义参数(这里可以添加你需要的参数)
            var custom_options = {
                width: options && options.width || 380,
                height: options && options.height || 'auto',
                title: options && options.title || '',
                content: {
                    template: tpl_html // 获取 alert 模板
                },
                close: function () {
                    $.kendobox.window.destroy(); // 销毁遮罩层
                }
            }

            var summary_options = $.extend({}, $.kendobox.default_options, options, custom_options); // 合并自定义参数

            $.kendobox.window = $("<div></div>").kendoWindow(summary_options).data("kendoWindow"); // 初始化遮罩层

            if (options && options.button) { //自定义按钮绑定事件
                for (var j = 0; j < options.button.length; j++) {
                    $('.kendo-btn-' + options.button[j].class).click(function () {
                        var index = $(this).attr('data-index');
                        options.button[index].callback(); // 自定义按钮执行回调函数
                    });
                }
            } else {
                $('.kendo-btn-ok').click(function () {
                    if (callback) callback(); // 确认按钮执行回调函数
                });
                $('.kendo-btn-cancel').click(function () {
                    $.kendobox.window.destroy(); // 销毁弹遮罩层
                });
            }

            $.kendobox.window.open().center(); // 弹出遮罩层
        },
        dialog: function(temlplate, callback, options){

            // alert 模板
            var tpl_html = '<div style="height: 80%;">' + temlplate + '</div>';
            tpl_html += '<div class="text-right">';
            if (options && options.button) { // 生成自定义按钮
                for (var i = 0; i < options.button.length; i++) {
                    tpl_html += '<a class="k-button ' + (options.button[i].focus ? 'k-primary' : '') + ' kendo-btn-' + options.button[i].class + '" data-index=' + i + '>'
                    + options.button[i].name + '</a>&nbsp;&nbsp;';
                }
            } else { // 默认按钮
                tpl_html += '<a class="k-button kendo-btn-ok k-primary">确定</a>&nbsp;&nbsp;';
                tpl_html += '<a class="k-button kendo-btn-cancel">取消</a>';
            }
            tpl_html += '</div>';

            // Kendo UI Window 遮罩层自定义参数(这里可以添加你需要的参数)
            var custom_options = {
                width: options && options.width || 380,
                height: options && options.height || 'auto',
                title: options && options.title || '',
                content: {
                    template: tpl_html // 获取 alert 模板
                },
                close: function () {
                    $.kendobox.window.destroy(); // 销毁遮罩层
                }
            }

            var summary_options = $.extend({}, $.kendobox.default_options, options, custom_options); // 合并自定义参数

            $.kendobox.window = $("<div></div>").kendoWindow(summary_options).data("kendoWindow"); // 初始化遮罩层

            if (options && options.button) { //自定义按钮绑定事件
                for (var j = 0; j < options.button.length; j++) {
                    $('.kendo-btn-' + options.button[j].class).click(function () {
                        var index = $(this).attr('data-index');
                        options.button[index].callback(); // 自定义按钮执行回调函数
                    });
                }
            } else {
                $('.kendo-btn-ok').click(function () {
                    if (callback) callback(); // 确认按钮执行回调函数
                });
                $('.kendo-btn-cancel').click(function () {
                    $.kendobox.window.destroy(); // 销毁弹遮罩层
                });
            }

            $.kendobox.window.open().center(); // 弹出遮罩层
        },
        close: function() {
            $.kendobox.window.destroy(); // 销毁遮罩层
        },
        validator: function(element, callback) {
            var validatable = $(element).kendoValidator().data('kendoValidator');
            if (validatable.validate()) {
                if (callback) callback(); // 执行回调函数
            }
        },
        notice_success: function(message) {
            $('<span></span>').kendoNotification({
                position: {
                    top: 120,
                    right: 20
                },
                allowHideAfter: 1000
            }).data('kendoNotification').show(message, 'success');
        },
        notice_info: function(message) {
            $('<span></span>').kendoNotification({
                position: {
                    top: 120,
                    right: 20
                },
                allowHideAfter: 1000
            }).data('kendoNotification').show(message, 'info');
        },
        notice_error: function(message) {
            $('<span></span>').kendoNotification({
                position: {
                    top: 120,
                    right: 20
                },
                allowHideAfter: 1000
            }).data('kendoNotification').show(message, 'error');
        }
    }; 

    // Kendo UI Window 遮罩层默认参数
    $.kendobox.default_options = {
        width: 380,
        height: 'auto',
        title: '',
        resizable: false,
        draggable: false,
        modal: true,
        animation: false
    }

    // Kendo UI Window 对象
    $.kendobox.window = {};

})(jQuery);