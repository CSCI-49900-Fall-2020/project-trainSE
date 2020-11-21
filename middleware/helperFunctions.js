module.exports = {
  lowercaseDashify: (unformatted_str) => {
    return unformatted_str.replace(/\s/g, "-").toLowerCase();
  },
  getTimeStamp: () => {
    const monthArr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    const d = new Date();
    const currDate = d.getDate();
    const currMonthNum = d.getMonth();
    const currYear = d.getFullYear();
    const currTime = d.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const dateString =
      monthArr[currMonthNum] +
      " " +
      currDate +
      ", " +
      currYear +
      " at " +
      currTime;
    return dateString;
  },
};
