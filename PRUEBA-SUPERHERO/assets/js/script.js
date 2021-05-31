$(document).ready(function(){
    $("form").submit(function(event){
          event.preventDefault()

          let valueInput = $("#superheroinput").val();
          if  (Number.isNaN(+valueInput)){
              alert("Ingrese un numero porfa")
              return false
          }
          
          $.ajax({
              url: "https://superheroapi.com/api.php/4150280658348891/" + valueInput,
              success: function(data){
                  console.log(data)
                  let nombre = data.name
                  let imagen = data.image.url
                  let conexiones = data.connections["group-affiliation"]
                  let ocupacion = data.work.occupation
                  let firstapp = data.biography["first-appearance"]
                  let altura = data.appearance.height
                  let peso = data.appearance.weight
                  let alias = data.biography.aliases
                  

                  $("#heroinfo").html(`
                <div class="tarjeta">
                <div class="card mb-6">
                <div class="row no-gutters">
                <div class="col-md-5">
                <img class="imagen-sh" src="${imagen}" alt="">
                </div>
                <div class="col-md-6">
                  <div class="card-body">
                    <h5 class="card-title">Super Hero Encontrado</h5>
                    <h6>${nombre}</h6>
                    <p class="card-text">Publicado por: ${conexiones}</p>
                    <p class="card-text">Ocupacion: ${ocupacion}</p>
                    <p class="card-text">Primera Aparicion: ${firstapp}</p>
                    <p class="card-text">Altura: ${altura}</p>
                    <p class="card-text">Peso: ${peso}</p>
                    <p class="card-text">Alianzas: ${alias}</p>
                  </div>
                </div>
              </div>
            </div>
      </div>
   
                  `)
                  let stats = Object.entries(data.powerstats)
                  let estadisticas = [];

                  stats.forEach(function (p) {
                      estadisticas.push({
                          label: p [0],
                          y: p [1],
                      });
                      
                  });


                  let config = {
                      animationEnable : true,
                      title: {
                          text:`Estadisticas de poder de ${nombre}`
                      },
                      axisY: {
                          title:"valor",
                      },
                      axisX: {
                          title:"Estadistica",
                      },
                      data: [
                          {
                              type:"pie",
                              dataPoints: estadisticas,
                            },
                        ],
                    };
                        let chart = new CanvasJS.Chart("grafico",config)
    
                            chart.render()  
                },
                error:function(){
                    alert("ERROR 404")
                }
            });
    });
});
