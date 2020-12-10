class MergeSort {
  constructor(values) {
    this.name = "Merge Sort";
    this.values = values;
    this.done = false;
    this.steps = 0;
    this.state = [];
    this.state.push({index:0, value:this.values[0]});
    this.state.push({index:0, value:this.values[0]});
    this.state.push({index:this.values.length-1, value:this.values[this.values.length-1]});
    this.toDos = [];
    this.toDos.push({ left: 0, right: values.length - 1, type: "recurse" })
    this.toMerge = [];
    //this.tempArray = Arrays.fill()
  }
  * sort() {
    while (this.toDos.length > 0) {
      let toDo = this.toDos.shift();
      if (toDo.type == "recurse") {
        if (toDo.left < toDo.right) {
          let center = Math.floor((toDo.left + toDo.right) / 2);
          let newToDoLeft = { left: toDo.left, right: center, type: "recurse" };
          let newToDoRight = { left: center + 1, right: toDo.right, type: "recurse" }
          this.toMerge.unshift({ left: toDo.left, center: center + 1, right: toDo.right, type: "merge" })
          this.toDos.unshift(newToDoRight);
          this.toDos.unshift(newToDoLeft);
          this.steps++;
          yield;
        }
      }
    }
    this.toMerge = this.toMerge.sort((a,b)=>(a.right-a.left) - (b.right - b.left));
    while(this.toMerge.length > 0){
      let toDo = this.toMerge.shift();
      if (toDo.type == "merge") {
        let tempArray = new Array(this.values.length).fill(0);
        let leftStart = toDo.left;
        let leftPos = toDo.left;
        let leftEnd = toDo.center - 1;
        let rightPos = toDo.center;
        let tempPos = toDo.left;
        let rightEnd = toDo.right;
        this.state[1].index = leftStart;
        this.state[1].value = -1;
        this.state[2].index = rightEnd;
        this.state[2].value = -1;

        while (leftPos <= leftEnd && rightPos <= rightEnd) {
          if (this.values[leftPos] < this.values[rightPos]) {
            tempArray[tempPos++] = this.values[leftPos++];
          }
          else {
            tempArray[tempPos++] = this.values[rightPos++];
          }
          this.state[0].index = Math.min(tempPos, rightEnd);
          this.state[0].value = tempArray[tempPos-1];
          this.steps++;
          yield;
        }
        while (leftPos <= leftEnd) {
          tempArray[tempPos++] = this.values[leftPos++];
          this.state[0].index = Math.min(tempPos, rightEnd);
          this.state[0].value = tempArray[tempPos-1];
          this.steps++;
          yield
        }
        while (rightPos <= rightEnd) {
          tempArray[tempPos++] = this.values[rightPos++];
          this.state[0].index = Math.min(tempPos, rightEnd);
          this.state[0].value = tempArray[tempPos-1];
          this.steps++;
          yield
        }

        for (let i = leftStart; i <= rightEnd; i++) {
          this.values[i] = tempArray[i];
          this.state[0].index = i;
          this.state[0].value = tempArray[i];
          this.steps++;
          yield;
        }
      }
    }


    this.done = true;
  }

}

export default MergeSort;