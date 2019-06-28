import {
    MessageBox,
    Toast
} from 'mint-ui'
export const baseComponent = {
    methods: {
        StartTimer(time) {
            if (!this.time) return;
            this.time = time;
            this.timer = setInterval(() => {
                this.time--;
                if (this.time === 0) {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.time = -1;
                }
            }, 1000);
        },
        Modal(title = '提示', message = '', options = {}) {
            return new Promise(async (res, rej) => {
                try {
                    await MessageBox.confirm(message, title, options);
                    res(1);
                } catch (error) {
                    console.warn(error);
                    res(0);
                }
            });
        },
        Toast(message) {
            // Toast(options);
            Toast({
                message,
                position: 'center',
                duration: 1500
              })
        },
    },
    filters: {
        initTime: function (timeNumber) {
            timeNumber = parseInt(timeNumber*1000);
            let createDate = new Date(timeNumber);
            return createDate.Format('yyyy/MM/dd');
        },
        initTimeDetail: function (timeNumber) {
            timeNumber = parseInt(timeNumber*1000);
            let createDate = new Date(timeNumber);
            return createDate.Format('yyyy/MM/dd hh:mm:ss');
        },
    },
    destroyed() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.time) this.time = -1;
    },
};