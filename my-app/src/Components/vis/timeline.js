
import Timeline from 'react-vis-timeline'

export default function timeline2(id, data2, tasks = [], startingTime = new Date().getTime(), unit = 1) {

    const options = {
        stack: true,
        maxHeight: '100%',
       start: new Date(2010, 7, 15),
        min: new Date(2010, 7, 15),
        end: new Date(2010, 8, 2),
        max: new Date(2010, 8, 2),
        showCurrentTime: false,
        zoomMin: 60 * 1000,
      //`  zoomMax: endTime,
        editable: false,
        selectable: false,
        width: '100%',
        // height: '400px',
        verticalScroll: true,
        margin: {
            item: 0
        }
    }
    const items = [{
        start: new Date(2010, 7, 15),
        end: new Date(2010, 8, 2),  // end is optional
        content: 'Trajectory A',
      }]
      const groups = [{
        id: 1,
        content: 'Group A',
      }]
    // const options = {
    //     width: '100%',
    //     height: '100px',
    //     // ...
    //     // ...
    //   }

    return (<Timeline options={options}  initialGroups={groups}   initialItems={items} />)
}


// import Timeline from 'react-visjs-timeline'
// //var Timeline = require("vis-timeline");
// /**TODO Get all items, group items, create color map of tasks
// */
// var vis = require("vis-data");
// var colormap = require("colormap");
// var tasks = [
//     "AwardContract",
//     "CheckOutcome",
//     "ProvideService",
// ];
// // export default function timeline(id, data2, tasks = [], startingTime = new Date().getTime(), unit = 1) {

// //     // if (tasks == null || data == null || tasks == [] || data == []) {
// //     //     console.log("No data to read")
// //     //     return
// //     // }
// //     // else { console.log("displaying results") }
// //     var container = document.getElementById("timelineContainer");
// //     var count = 0;
// //     const data =simulationData
// //     var groups = new vis.DataSet();
// //     var items = new vis.DataSet();
// //     var colorHash = getColorHash(tasks);

// //     var startTime = new Date(startingTime).getTime();
// //     var endTime = new Date(startingTime).getTime();

// //     for (let i = 0; i < data.length; i++) {
// //         let group = data[i];
// //         groups.add({
// //                 id: group.label,
// //                 content: group.label,
// //             });
// //             let item = group;
// //             let task_start = new Date(startTime + item["starting_time"] * unit);
// //             let task_end = new Date(startTime + item["ending_time"] * unit);
// //             // let task_start = item.starting_time
// //             // let task_end =item.ending_time
// //             if (task_end.getTime() > endTime) {
// //                 endTime = task_end.getTime();
// //             }
// //             let task_duration = new Date((item["ending_time"] - item["starting_time"]) * unit); //
// //             // let task_delay = new Date(item.delay * unit); // not anymore
// //             const color = colorHash[item.task];
// //             items.add({
// //                 //id: item.id, // lot
// //                 content: `${item.label}`,// [${item.id}]`, // lot
// //                 title: `${item.label} [ID: ${item.id}]<br>Cost: ${item.cost}, Delay` + "<br>" +
// //                 task_start.toLocaleTimeString() + " - " + task_end.toLocaleTimeString() + " (" + task_duration.toISOString().substr(11, 8) + ")",
// //                 start: task_start,
// //                 startTrue: task_start,
// //                 end: task_end,
// //                 endTrue: task_end,
// //                 group: group.label,
// //                 ended: true,
// //                 style: `background-color: ${color}`,
// //             });

// //         }
// //         console.log("items are " + JSON.stringify(items))
// //         console.log("Start: " + startTime + " -> " + new Date(startTime));
// //         console.log("End: " + endTime + " -> " + new Date(endTime));

// //         // Configuration for the Timeline
// //         // specify options
// //         var options = {
// //             stack: true,
// //             //maxHeight: '100%',
// //             start: new Date(startTime),
// //             min: new Date(startTime),
// //             end: new Date(endTime),
// //             max: new Date(endTime),
// //             showCurrentTime: false,
// //             zoomMin: 60 * 1000,
// //             zoomMax: endTime,
// //             editable: false,
// //             selectable: false,
// //             width: '100%',
// //             // height: '400px',
// //             verticalScroll: true,
// //             margin: {
// //                 item: 0
// //             }
// //         };

// //         // create a Timeline
// //         return <Timeline options={options} initialItems={items} groups={groups}/>
// //     }

// function getColorHash(tasks) {
//     var colors = colormap({
//         colormap: "phase",
//         nshades: 64,
//         format: 'hex'
//     });
//     var colorHash = {}
//     tasks.map((prop, idx) => {
//         var cidx = 0;
//         if (tasks.length > 64) {
//             cidx = idx % 64;
//         } else if (tasks.length > 1) {
//             cidx = Math.floor(idx * 63 / tasks.length);
//             // we could divide by tasks.length - 1 to get to 63 exactly
//             // but most colormaps are cyclic so the last color is same as/similar to the first
//         } else {
//             cidx = 0;
//         }
//         const c = colors[cidx];
//         //console.log("" + prop + " : " + idx + " > " + cidx + " : " + c);
//         colorHash[prop] = c;
//     });
//     return colorHash;//list of colors mapped to tasks
// }
// export default function workflowUnitTimeline(id, data, tasks2 = []) {
//     // var container = document.getElementById(id);
//     const data = simulationData
//     var tasks = [
//         "AwardContract",
//         "CheckOutcome",
//         "ProvideService",
//     ];
//     var count = 0;
//     var groups = new vis.DataSet();
//     var items = new vis.DataSet();
//     var colorHash = getColorHash(tasks);

//     var startTime = 0;
//     var endTime = 0;

//     for (let i = 0; i < data.length; i++) {
//         let group = data[i];
//         groups.add({
//             id: Object.keys(data)[i],
//             content: Object.keys(data)[i],
//         });
//         for (let j = 0; j < group.times.length; j++) {
//             let item = group.times[j];
//             let task_start = startTime + item["starting_time"];
//             let task_end = startTime + item["ending_time"];
//             if (task_end > endTime) {
//                 endTime = task_end;
//             }
//             let task_duration = item["ending_time"] - item["starting_time"]; //
//             let task_delay = item.delay; // not anymore
//             const color = colorHash[item.task];
//             items.add({
//                 //id: item.id, // lot
//                 content: `${item.label}`,// [${item.id}]`, // lot
//                 title: `${item.label} [ID: ${item.id}]<br>Cost: ${item.cost}, Delay: ${task_delay}` + "<br>" +
//                     task_start + " - " + task_end + " (" + task_duration + ")",
//                 start: task_start,
//                 startTrue: task_start,
//                 end: task_end,
//                 endTrue: task_end,
//                 group: group.label,
//                 ended: true,
//                 style: `background-color: ${color}`,
//             });
//         }
//     }
//     console.log("Start: " + startTime);
//     console.log("End: " + endTime);

//     // Configuration for the Timeline
//     // specify options
//     var options = {
//         stack: true,
//         //maxHeight: '100%',
//         start: startTime,
//         min: startTime,
//         end: endTime,
//         max: endTime,
//         showCurrentTime: false,
//         zoomMin: 3,
//         zoomMax: endTime,
//         editable: false,
//         selectable: false,
//         width: '100%',
//         // height: '400px',
//         verticalScroll: true,
//         margin: {
//             item: 0
//         }
//     };
//     console.log("groups is " + JSON.stringify(groups))
//     // create a Timeline
//     return <Timeline className="w-screen" options={options} initialItems={items} groups={groups}/>
// }

// // module.exports = {
// //     workflowUnitTimeline,
// //     workflowTimeline
// // };

// // window.workflowUnitTimeline = workflowUnitTimeline;
// // window.workflowTimeline = workflowTimeline;
