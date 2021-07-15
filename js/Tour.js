AFRAME.registerComponent("tour",{
  schema:{
    state: {type: "string", default: "places-list"},
    selectedCard: {type:"string", default: "#card1"},
    zoomAspectRatio: {type: "number", default: 1}
  },
  init:function(){
    this.placesContainer = this.el;
    this.cameraEl = document.querySelector("#camera");
    this.createCards();
  },

  tick:function(){
    const {state} = this.el.getAttribute("tour")
    if(state==="view"){
      this.hideEl([this.placesContainer])
      this.showView()
    }
  },

  update: function(){
    window.addEventListener("keydown", e=>{
      if(e.key==="ArrowUp"){
        if(
          (this.data.zoomAspectRatio<=10&&this.data.state==="view")||
          (this.data.zoomAspectRatio<=10&&this.data.state==="change-view")
        ){
          this.data.zoomAspectRatio+=0.002;
          this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio)
        }
      }
      if(e.key==="ArrowDown"){
        if(
          (this.data.zoomAspectRatio>1&&this.data.state==="view")||
          (this.data.zoomAspectRatio>1&&this.data.state==="change-view")
        ){
          this.data.zoomAspectRatio-=0.002;
          this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio)
        }
      }
    })
  },

  createCards:function(){
    const thumbNailsRef=[
      {
        id:"taj-mahal",
        title : "Taj Mahal",
        url : "./assets/thumbnails/taj_mahal.png",
      },
      {
        id:"budapest",
        title : "Budapest",
        url : "./assets/thumbnails/budapest.jpg",
      },
      {
        id:"eiffel-tower",
        title : "Eiffel Tower",
        url : "./assets/thumbnails/eiffel_tower.jpg",
      },
      {
        id:"new-york-city",
        title : "New York City",
        url : "./assets/thumbnails/new_york_city.png",
      },
    ];

    let previousXPos = -60;

    for(var item of thumbNailsRef){
      const posX = previousXPos + 25;
      const posY = 10;
      const posZ = -40;
      const position = {x:posX,y:posY,z:posZ};
      previousXPos = posX;

      const borderEl = this.createBorder(position, item.id);

      const thumbnail = this.createThumbNail(item);
      borderEl.appendChild(thumbnail)

      const titleEl = this.createTitle(position,item);
      borderEl.appendChild(titleEl)

      this.placesContainer.appendChild(borderEl)
    }
  }, 

  createBorder:function(position, id){
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id)
    entityEl.setAttribute("visible", true)
    entityEl.setAttribute("geometry", {
        primitive:"ring", radiusInner:9, radiusOuter:10
    })
    entityEl.setAttribute("position", position)
    entityEl.setAttribute("material", {color: "purple", opacity: 1});

    entityEl.setAttribute("cursor-listener",{})
    return entityEl
  },

  createThumbNail:function(item){
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("visible", true)
      entityEl.setAttribute("geometry", {primitive: "circle", radius: 9})
      entityEl.setAttribute("material", {src:item.url})
      entityEl.setAttribute("cursor-listener", {});
      return entityEl
  }, 

  createTitle:function(position, item){
      const entityEl = document.createElement("a-entity");
      entityEl.setAttribute("text", 
      {font:"exo2bold", 
       align: "center",
       width: 60,
       color: "green", 
       value: item.title});
       const elpos = position;
       elpos.y = -20
       entityEl.setAttribute("position", elpos)
       entityEl.setAttribute("visible", true)
       return entityEl
  },

  hideEl: function(elList){
    elList.map(el=>{
      el.setAttribute("visible", false)
    })
  },

  showView: function(){
    const {selectedCard} = this.data
    const skyEl = document.querySelector("#main-container")
    skyEl.setAttribute("material", {src:`./assets/360_images/${selectedCard}/place-0.jpg`, color:"#FFF"})
  }
}

)
