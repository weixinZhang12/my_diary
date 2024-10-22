export default {
    getNowDate: () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // 月份是从0开始的，所以需要加1
        const day = now.getDate();

        // 将月份和日期格式化为两位数
        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;

        // 返回格式化的日期字符串，例如 "2023-04-01"
        return `${year}-${formattedMonth}-${formattedDay}`;
    },
    getDateTime() {
        let today = new Date();

        //日期
        let DD = String(today.getDate()).padStart(2, '0'); // 获取日
        let MM = String(today.getMonth() + 1).padStart(2, '0'); //获取月份，1 月为 0
        let yyyy = today.getFullYear(); // 获取年

        // 时间
        let hh = String(today.getHours()).padStart(2, '0');       //获取当前小时数(0-23)
        let mm = String(today.getMinutes()).padStart(2, '0');     //获取当前分钟数(0-59)
        let ss = String(today.getSeconds()).padStart(2, '0');     //获取当前秒数(0-59)
        return yyyy + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
    }
}