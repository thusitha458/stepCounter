import moment from "moment";

export const getDateFromEpochTime = time => {
    return moment(time).calendar();
};

export const getDurationFromMilliseconds = milliseconds => {
    let momentDuration = moment.duration(milliseconds);
    let hours = momentDuration.hours();
    let minutes = momentDuration.minutes();
    let seconds = momentDuration.seconds();
    return `${hours}h:${minutes >= 10 ? minutes : `0${minutes}`}m:${seconds >= 10 ? seconds : `0${seconds}`}s`;
};
