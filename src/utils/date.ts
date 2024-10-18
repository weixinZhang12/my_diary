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
    }
}