import AlarmScreen from "./AlarmScreen";

export type alarmRow = {
   id:number, 
   time:string, 
   Mon:0|1, 
   Tue:0|1, 
   Wed:0|1, 
   Thu:0|1, 
   Fri:0|1, 
   Sat:0|1, 
   Sun:0|1, 
   activated:0|1
};

export interface listItemProps{
   data:alarmRow,
   parent: AlarmScreen
   // refreshParent:()=>void
}