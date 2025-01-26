type Time = {
    [key:string]:number
}
export default function formatDuration(start:number,finish:number){
    let timeDiff = finish - start;
    const time:Time = { ч: 3600, мин: 60, сек: 1 };
    const res = [];
    if (timeDiff === 0) return '0';
    for (var key in time) {
        if (timeDiff >= time[key]) {
        var val = String(Math.floor(timeDiff/time[key]));
        res.push(val += Number(val) > 1 ? ' ' + key  : ' ' + key);
        timeDiff = timeDiff % time[key];
        }
    }
    return res.length > 1 ? res.join(', ').replace(/,([^,]*)$/,' и'+'$1') : res[0]
}