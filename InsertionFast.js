class InsertionFast{
  constructor(values){
    this.name = "Insertion Fast";
    this.values = values;
    this.done = false;
    this.steps = 0;
    this.state = [];
    this.sortedIndex = 0;    
  }
  * sort(){
    for (let i = 1; i < this.values.length; i++) {
      let cont = true;
      for (let j = i; j >0 && cont; j--) {
        this.steps++;

        let toReturn = []
        toReturn.push({value:this.values[j]});
        toReturn.push({value:this.values[j-1]});


        if(this.values[j-1] > this.values[j]){
          let temp = this.values[j - 1];
          this.values[j - 1] = this.values[j];
          this.values[j] = temp;
        }
        else{
          cont = false;
        }
        

        //For visualization only
        toReturn.push({value:this.values[i]});
       
        toReturn[0].index = j;
        toReturn[1].index = j-1;
        toReturn[2].index = i;
        this.state = toReturn;
        yield toReturn;
      }
      
    }
    this.done = true;
  }
}

export default InsertionFast;