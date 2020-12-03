class BubbleFast{
  constructor(values){
    this.name = "Bubble Fast";
    this.values = values;
    this.done = false;
    this.steps = 0;
    this.state = [];
    
  }
  * sort(){
    for (let i = 0; i < this.values.length; i++) {
      for (let j = 0; j < this.values.length - i - 1; j++) {
        this.steps++;

        let toReturn = []
        //For visualization only
        toReturn.push({value:this.values[j]});
        toReturn.push({value:this.values[j+1]});
        //compare2Values[0] = this.values[j + 1];
        if (this.values[j + 1] < this.values[j]) {


          //Actual Bubble Sort
          let temp = this.values[j + 1];
          this.values[j + 1] = this.values[j];
          this.values[j] = temp;
        }
        toReturn[0].index = j;
        toReturn[1].index = j+1;
        this.state = toReturn;
        yield toReturn;
      }
    }
    this.done = true;
  }
}

export default BubbleFast;