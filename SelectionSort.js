class SelectionSort{
  constructor(values){
    this.name = "Selection Sort";
    this.values = values;
    this.done = false;
    this.steps = 0;
    this.state = [];
    this.sortedIndex = 0;    
  }
  * sort(){
    for (let i = 0; i < this.values.length; i++) {
      let smallestValue = this.values[i];
      let smallestIndex = i;
      for (let j = i+1; j < this.values.length; j++) {
        this.steps++;
        if(this.values[j] < smallestValue){
          smallestValue = this.values[j];
          smallestIndex = j;
        }

        let toReturn = []
        //For visualization only
        toReturn.push({value:this.values[i]});
        toReturn.push({value:this.values[j]});
        toReturn.push({value:smallestValue});
        toReturn[0].index = i;
        toReturn[1].index = j;
        toReturn[2].index = smallestIndex;
        this.state = toReturn;
        yield toReturn;
      }
      let temp = this.values[i];
      this.values[i] = smallestValue;
      this.values[smallestIndex] = temp;
    }
    this.done = true;
  }
}

export default SelectionSort;