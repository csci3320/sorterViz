class Quicksort {
  constructor(values) {
    this.name = "Quicksort";
    this.values = values;
    this.done = false;
    this.steps = 0;
    this.state = [];
    this.state.push({ index: 0, value: this.values[0] });
    this.state.push({ index: 0, value: this.values[0] });
    this.state.push({ index: this.values.length - 1, value: this.values[this.values.length - 1] });
    this.state.push({index:0, value:-1});
    this.toDos = [];
    this.toDos.push({ left: 0, right: values.length, type: "recurse" })
  }
  * sort() {
    while (this.toDos.length > 0) {
      let toDo = this.toDos.shift();
      if (toDo.type == "recurse") {
        if (toDo.left < toDo.right-1) {
          let center = Math.floor((toDo.left + toDo.right) / 2);
          let pivotValue = this.values[center];
          let lessThan = [];
          let greaterThan = [];
          this.state[0].index = center;
          this.state[0].value = pivotValue;
          this.state[1].index = toDo.left;
          this.state[1].value = -1;
          this.state[2].index = toDo.right-1;
          this.state[2].value = -1;

          for (let i = toDo.left; i < toDo.right; i++) {
            this.state[3].index = i;
            if (i == center) {
              this.steps++;
              yield;
              continue;
            }; //Skip the pivot index
            let absoluteIndex = i;
            let currentValue = this.values[absoluteIndex]
            if (currentValue < pivotValue) {
              lessThan.push(currentValue);
              this.steps++;
              yield;
            }
            else {
              greaterThan.push(currentValue);
              this.steps++;
              yield;
            }
          }
          for(let i = 0; i < lessThan.length; i++){
            let absoluteIndex = toDo.left + i;
            this.state[3].index = absoluteIndex;
            this.values[absoluteIndex] = lessThan[i];
            this.steps++;
            yield;
          }
          let newPivotIndex = toDo.left + lessThan.length;
          this.values[newPivotIndex] = pivotValue;
          this.state[3].index = newPivotIndex;
            
          this.steps++;
          yield;
          for(let i = 0; i < greaterThan.length; i++){
            let absoluteIndex = toDo.left + lessThan.length + 1 + i;
            
            this.values[absoluteIndex] = greaterThan[i];
            this.state[3].index = absoluteIndex;
            
            this.steps++;
            yield;
          }

          let newToDoLeft = { left: toDo.left, right: newPivotIndex, type: "recurse" };
          let newToDoRight = { left: newPivotIndex + 1, right: toDo.right, type: "recurse" }
          this.toDos.unshift(newToDoRight);
          this.toDos.unshift(newToDoLeft);
          this.steps++;
          yield;
        }
      }
    }
    


    this.done = true;
  }

}

export default Quicksort;