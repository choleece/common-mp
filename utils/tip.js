/**
 * @description 交互合集
 * @author choleece
 * @date 2018-09-13
 * @type {{showToast: tip.showToast, hideToast: tip.hideToast, showLoading: tip.showLoading, hideLoading: tip.hideLoading, showModal: tip.showModal}}
 */
const tip = {
    showToast: (title, icon = 'success', duration = 1500, mask = true) => {
        wx.showToast({
            title: title,
            icon: icon,
            duration: duration,
            mask: mask
        });
    },
    hideToast: () => {
        wx.hideToast();
    },
    showLoading: (title, mask = true) => {
        wx.showLoading({title: title, mask: mask});
    },
    hideLoading: () => {
        wx.hideLoading();
    },
    showModal: (title, content, showCancel = true, cancelText = '取消', cancelColor = '#000000', confirmText = '确认', confirmColor = '#3cc51f', sucFunc, failFunc) => {
        wx.showModal({
            title: title, content: content, showCancel: showCancel, cancelText: cancelText, cancelColor: cancelColor, confirmText: confirmText, confirmColor: confirmColor,
            success: (res) => {
                if (typeof sucFunc === 'function') {
                    sucFunc(res);
                }
            },
            fail: (res) => {
                if (typeof failFunc === 'function') {
                    failFunc(res);
                }
            }
        })
    }
};

export default tip;