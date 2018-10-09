$(document).ready(function(){
  $('.animate').waypoint(function() {
        //retrieving 'datas'
        var domElement = this.element;
        var jqueryElement = $(domElement);
        var animation = jqueryElement.data("animate");
        var delay     = jqueryElement.data("delay") != null ? jqueryElement.data("delay") : "0";
        var offset    = jqueryElement.data("offset")!= null ? jqueryElement.data("offset") : "88%";
        jqueryElement.delay(delay).queue(function(){
            jqueryElement.addClass(animation + " animated");
        });
      }, { offset: "80%"}
  );
});

let NomesProcessos=["Chrome","Firefox","Eclipse","Processing","Dev-c++","Bloco de Notas","League of Legends","Paint",
"Mega","WhatsApp","XAMPP","Arduino","Excel","Word","Netbeans","FileZilla","Studio"];
//Nome dos processos

let nomeUsuarios=["nobody","lp","root","super user","Luiz","Marcos",
"Wendel","Alexandre","Luiz","Rodolfo"];
/*
nobody (linux): manipular as solicitações HTTP
lp (Linux): manipula solicitações de impressão
root :super user
*/

var VetorProcessos=[] //VETOR QUE GUARDA OS OBJETOS DO TIPO PROCESSOS
var run = new Boolean(false) //EXECUTA
var runPCB = new Boolean(false) //EXECUTA
var VetorProcessosTermino=[] //VETOR QUE GUARDA OS PROCESSOS FINALIZADOS
var contadora
let memoria=0; //MEMORIA PRINCIPAL
class Processo {//Classe Processo
    constructor(nome,tamanho,prioridade,estado,ID,valorREG,COR,tempo,tipo,usuario) {
      this.nome = nome;
      this.tamanho = tamanho;
      this.prioridade;
      this.estado;
      this.ID;
      this.valorREG;
      this.COR;
      this.tempo;
      this.tipo;
      this.usuario;
    }
}

/************************ CREATION OF PROCESSES *************************/
function criarProcesso(){

  var NomeProcesso = criarUnico()
  NomeProcesso='ID'+NomeProcesso//criando um nome unico
  var ultimo=VetorProcessos.length//retorna o tamanho do vetor
  let processo = Object.create(Processo);//cria um objeto do tipo processo
  processo.usuario=nomeUsuarios[Math.ceil(Math.random()*nomeUsuarios.length-1)]//Gera um nome aleatoria
  processo.nome=NomesProcessos[Math.ceil(Math.random()*NomesProcessos.length-1)]//Gera um nome aleatoria  
  processo.tamanho=Math.ceil(Math.random()*5);//valor randomico até 20
  processo.ID=NomeProcesso;
  processo.estado=0;
  processo.prioridade=Math.ceil(Math.random()*15)
  processo.tempo=0;

  VetorProcessos.push(processo)//adiciona no final do vetor
  imprimiProcessoCriado(ultimo);
}

var sorteados = [];
var valorMaximo = 1000;
function criarUnico() { // CRIA UM VALOR ALEATORIO UNICO
    if (sorteados.length == valorMaximo) {
        if (confirm('Já não há mais! Quer recomeçar?')) sorteados = [];
        else return;
    }
    var sugestao = Math.ceil(Math.random() * valorMaximo); // Escolher um numero ao acaso
    while (sorteados.indexOf(sugestao) >= 0) {  // Enquanto o numero já existir, escolher outro
        sugestao = Math.ceil(Math.random() * valorMaximo);
    }
    sorteados.push(sugestao); // adicionar este numero à array de numeros sorteados para futura referência
    return sugestao; // devolver o numero únicofina
}


var intervalo;  /************************* CRONOMETRO*************************/
function tempo(op) {
  if (op == 1) {
    document.getElementById('parar').style.display = "block";
    document.getElementById('comeca').style.display = "none";
  }
  var s = 1;
  var m = 0;
  var h = 0;
  intervalo = window.setInterval(function() {
    if (s == 60) { m++; s = 0; }
    if (m == 60) { h++; s = 0; m = 0; }
    if (h < 10) document.getElementById("hora").innerHTML = "0" + h + "h"; else document.getElementById("hora").innerHTML = h + "h";
    if (s < 10) document.getElementById("segundo").innerHTML = "0" + s + "s"; else document.getElementById("segundo").innerHTML = s + "s";
    if (m < 10) document.getElementById("minuto").innerHTML = "0" + m + "m"; else document.getElementById("minuto").innerHTML = m + "m";    
    s++;
  },1000);
}

function parar() {
  window.clearInterval(intervalo);
  document.getElementById('parar').style.display = "none";
  document.getElementById('comeca').style.display = "block";
}

function volta() {
  document.getElementById('voltas').innerHTML += document.getElementById('hora').firstChild.data + "" + document.getElementById('minuto').firstChild.data + "" + document.getElementById('segundo').firstChild.data + "<br>";
}

function limpa() {
  document.getElementById('voltas').innerHTML = "";
}
window.onload=tempo;





/************************ AND CREATION OF PROCESSES *************************/

/**************************** PRINT OUT *************************************/
function imprimiProcessoCriado(ultimo){//imprimir processo que acabou de ser criado
       if(VetorProcessos[ultimo].estado==0){
            $( "#pronto div" ).append('<p class="nomePronto">'+
                               VetorProcessos[ultimo].nome+
                        ' '+VetorProcessos[ultimo].ID+'</p>');         
        }

     else if(VetorProcessos[ultimo].estado==1){
        $( "#execucao div" ).append('<p class="Nome">'+
                           VetorProcessos[ultimo].nome+
                    ' '+VetorProcessos[ultimo].ID+'</p>');
      }        
     
     else if(VetorProcessos[ultimo].estado==2){
          $( "#Espera div" ).append('<p class="Nome">'+
                             VetorProcessos[ultimo].nome+
                      ' '+VetorProcessos[ultimo].ID+'</p>');
      }
}

function imprimir(){// FUNÇÃO QUE IMPRIME
  
  $( "#pronto div" ).empty();
  $( "#fila-de-processos div" ).empty();
  $( "#Espera div" ).empty();
  
    if(VetorProcessos[0]==undefined){
      $( "#fila-de-processos div" ).append('<p id="not-exist"><span>Não</span> existe Processo!</p>');
      $("#fila-de-processos p#not-exist").fadeIn();//aparece a mensagem se não existir processo
    }
    else{//SE EXISTIR  OBJETOS NO VETOR
      var i=0;
      var contador=(VetorProcessos.length)-1

    while (i<VetorProcessos.length){
      VetorProcessos[0].estado=2;// VALOR 02 ESTADO DE ESPERA
      i++;

     if(VetorProcessos[contador].estado==0){
        $( "#pronto div" ).empty();
        for (indice=2;indice<VetorProcessos.length;indice++){
            $( "#pronto div" ).append('<p class="Nome">'+
                               VetorProcessos[indice].nome+
                        ' '+VetorProcessos[indice].ID+'</p>');
        }
     }

      var Color1=Math.ceil(Math.random()*256)
        
        if(VetorProcessos[0]!=undefined){
        $( "#fila-de-processos div" ).empty();// limpar
        for (indice=0;indice<VetorProcessos.length;indice++){
            $( "#fila-de-processos div" ).append('<p class="Nome">'+
                      VetorProcessos[indice].nome+' '+VetorProcessos[indice].ID+' '+
                     'Prior:'+'<span id="priority">'+' '
                     +VetorProcessos[indice].prioridade
                     +'</span>'+'<button class="btn btn-default" onclick="removerProcesso(\''
                     +VetorProcessos[indice].ID+'\')"><i class="fas fa-trash"></i></button></p>');

            $( "#fila-de-processos div p" ).css("background-color","rgb("+0+", "+0+", "+Color1+")");
            //cor aleatoria
        }           
     }
    $("#fila-de-processos p#not-exist").fadeOut();//Some a mensagem se existir processo
   
    }
  }
}

setInterval(imprimirTermino,100);
function  imprimirTermino(){ 

    if(VetorProcessosTermino[0]!=undefined){
      $("#termino div").empty();
        let contaT=0;
        for (contaT=0;contaT<VetorProcessosTermino.length;contaT++){
           $( "#termino div" ).append('<p class="termino">'+
                          VetorProcessosTermino[contaT].nome+
                       ' '+VetorProcessosTermino[contaT].ID+'</p>');
         }      
    }
}

setInterval(dadosTermino,10);
function dadosTermino(){
     let conta=0;
     if(VetorProcessosTermino[0]!=undefined){
      //  $( "table tbody" ).empty();
        for (conta=0;conta<VetorProcessosTermino.length;conta++){
          if ( $("table tbody").find("#"+VetorProcessosTermino[conta].ID).length == 0 ){
           $( "table tbody" ).prepend('<tr id="'+VetorProcessosTermino[conta].ID+'">'
              +'<td>'+   VetorProcessosTermino[conta].ID+'</td>'
              +'<td>'+   VetorProcessosTermino[conta].tamanho+'</td>'
              +'<td>'+   VetorProcessosTermino[conta].tempo+'</td>'
              +'<td>'+   VetorProcessosTermino[conta].nome+'</td>'
              +'<td>'+   VetorProcessosTermino[conta].usuario+'</td>'+
            '</tr>');
         }
        }

      }else {
         for (conta=0;conta<VetorProcessosTermino.length;conta++){
           $( "table tbody" ).append('<tr>'
              +'<td>'+ 'não exite nenhum processo com estado de termino ainda!'  +'</td>'+
              +'<td>'+ 'não exite nenhum processo com estado de termino ainda!'  +'</td>'+
              +'<td>'+ 'não exite nenhum processo com estado de termino ainda!'  +'</td>'+
              +'<td>'+ 'não exite nenhum processo com estado de termino ainda!'  +'</td>'+
            '</tr>'); 
       }
    }
}

// setInterval(dadosTermino,100);
// function dadosTermino(){
//      var conta=0;
//       $( "table tbody" ).empty();
//      if(VetorProcessosTermino[0]!=undefined) {

//         for(conta=0;conta<VetorProcessosTermino.length;conta++){

//            $( "table tbody" ).append('<tr>'+
//               '<td>'+   VetorProcessosTermino[conta].ID+'</td>'+
//               '<td>'+   VetorProcessosTermino[conta].tamanho+'</td>'+
//               '<td>'+   VetorProcessosTermino[conta].tempo+'</td>'+
//               '<td>'+   VetorProcessosTermino[conta].nome+'</td>'+
//               '<td>'+   VetorProcessosTermino[conta].usuario+'</td>'+
//             '</tr>');
//          }
//       }else {
//         $( "table tbody" ).append('<tr>'
//               +'<td>'+ 'NÃO EXITE NENHUM PROCESSO!'  +'</td>'
//               +'<td>'+ '------------------'  +'</td>'
//               +'<td>'+ '------------------'  +'</td>'
//               +'<td>'+ '------------------'  +'</td>'
//               +'<td>'+ '------------------'  +'</td>'+
//             '</tr>'); 
//        }
// }










function imprimirPCB(){
      $("#details-dados p span.memoria" ).empty();// limpar 
      $("#details-dados p span#qtdProcessos" ).empty();
        memoria=0;
    if(VetorProcessos[0]!=undefined){
        for (contadora=0;contadora<VetorProcessos.length;contadora++){
              
            memoria+=VetorProcessos[contadora].tamanho
       }
         $("#details-dados p span.memoria" ).append('<p class="terminoPCB">'
                  +memoria+'%'+'</p>');
         
         $("#details-dados p span#qtdProcessos" ).append('<p class="terminoPCB">'
                  +(VetorProcessos.length+1)+'</p>');

    }
    else {
      $("#details-dados p span.memoria" ).append('<p class="terminoPCB">100% disponivel</p>');
        $("#details-dados p span#qtdProcessos" ).append('<p class="terminoPCB">0</p>');
    }
    if(memoria> 95){
        if(runPCB){
      alert('Sua Maquiná esta com muitos Processos! Finalize algum  Processo')
          runPCB=true
      }else { runPCB=!runPCB }//imprimir o alert somente uma vaz
    }
}

function imprimirInforProcesso(){//mostrar informações de um processo PCB    
    var capturandoID= "";
   capturandoID = document.getElementById('valor').value;
        if(VetorProcessos[0]!=undefined){

          for(indice=0;indice<VetorProcessos.length;indice++){
             if (capturandoID==VetorProcessos[indice].ID) {

                  $("#details #name-process").empty();
                  $("#details #PIDprocesso ").empty();
                  $("#details #tamanhoProcesso").empty();

                $("#details #name-process").append('<p class="infoProcesso">'
                  +'Nome: '+(VetorProcessos[indice].nome)+'</p>'); 

                $("#details #PIDprocesso").append('<p class="infoProcesso">'
                  +'PID: '+(VetorProcessos[indice].ID)+'</p>'); 
                
                $("#details #tamanhoProcesso").append('<p class="infoProcesso">'
                  +'Tamanho: '+(VetorProcessos[indice].tamanho)+'</p>');  
            }
          }

       }else { alert('Não existe Processo!') }
}

setInterval(imprimirEspera,10);
function  imprimirEspera(){
      $( "#Espera div" ).empty();

      if(VetorProcessos[0]!=undefined){
       for (indice=0;indice<VetorProcessos.length;indice++){
           $( "#Espera div" ).append('<p class="Nome">'+
                              VetorProcessos[indice].nome+
                       ' '+VetorProcessos[indice].ID+'</p>');
       }
    }
}

/************************ AND PRINT OUT *************************************/

/************************ CONFIGURATION *************************************/

var TempoAtual = setInterval(meuTempo, 1000);//Tempo atual
function meuTempo() {
    var data = new Date();
    document.getElementById("demo").innerHTML = data.toLocaleTimeString();
}

function limparListaTermino(){//limpar lista de termino

var LimparVetor=VetorProcessosTermino.length;
    if (confirm('Tem certeza que deseja remover a lista de Termino?'))
    VetorProcessosTermino.splice(0,LimparVetor)

    $( "#termino div" ).empty();// limpar
}

setInterval(imprimirExecucao,10);
function imprimirExecucao(){
      $( "#execucao div" ).empty();// limpar
     if(VetorProcessos.length>1){
        $( "#execucao div" ).empty();// limpar
        //for (indice=1;indice<VetorProcessos.length;indice++){
            $( "#execucao div" ).append('<p class="Nome">'+
                   VetorProcessos[1].nome+
            ' '+VetorProcessos[1].ID+' '+VetorProcessos[1].valorREG+'</p>');
    }
}

setInterval(mudaValorREG,100);//FUNÇÃO MUDA VALORES DOS REGISTRADORES (CONTEXTO DE HARDWARE)
function mudaValorREG(){

     if((VetorProcessos[0]!=undefined) && ((VetorProcessos[1]!=undefined)) ){
       VetorProcessos[1].valorREG=Math.floor((Math.random() * 999) + 100);
    }
}

setInterval(escalonamento,10);//Intereval de  10 milisecundos para escalonar o Vetor 
function escalonamento(){ //ORDENAR VETOR DE OBJETOS
    if(VetorProcessos[0]!=undefined){
          VetorProcessos.sort(function (a, b) {
        return (a.prioridade < b.prioridade) ? 1 : ((b.prioridade < a.prioridade) ? -1 : 0); 
    });
    console.log('Escalonamento')
  }
}

setInterval(tempoEspera,6000);// REMOVER A CADA 6 SECUNDOS 
function tempoEspera(){ //ORDENAR VETOR DE OBJETOS

  if(VetorProcessos[0]!=undefined){
    VetorProcessosTermino=(VetorProcessos.splice(0, 1))//remove e add no vet termino
    // console.log('removera cada 6 SECUNDOS')
  }

}

setInterval(contaTempo,1000);//CONTA TEMPO
function contaTempo(){
     if((VetorProcessos[0]!=undefined)){
        for (indice=0;indice<VetorProcessos.length;indice++){
            VetorProcessos[indice].tempo++;
            // console.log(VetorProcessos[indice].tempo)
       }
    }
}


//***** FUNÇÃO PARA OSCILAR ESTADO ENTRE PRONTO E EXECUÇÃO
// function AtribuirEstado(){//muda estado pronto e espera
//         var i;
//         i=parseInt(i)
//         i=0
//        while (i<VetorProcessos.length){
//           if (!run){
//               VetorProcessos[i].estado=1;//
              
//           }else { VetorProcessos[i].estado=0;}
//           i++;
//           //console.log(run)//muda estado true -false
//       }
//       run=!run
// }


// var CORESorteadas = [];
// var corMaxima= 1000;
// function criarCorUnica(){ // CRIA UMA COR ALEATORIA

//   var hexadecimais ='0123456789ABCDEF';
//   var cor = '#';
//   if (CORESorteadas.length == corMaxima){
//     if (confirm('Ja nao ha mais cores! Quer recomeçar ?')) CORESorteadas = [];
//     else return;
//   }

//   for (var i=0;i<6;i++) {//E concatena à variável cor
//       cor += hexadecimais[Math.floor(Math.random() * 16)];
//   }

//   while(CORESorteadas.indexOf(cor) >= 0){//ENQUANTO A COR JA EXISTIR, GERA OUTRA 
//       for (var i = 0; i < 6; i++ ) {
//           cor += hexadecimais[Math.floor(Math.random() * 16)];
//       }
//       CORESorteadas.push(cor);
//       return cor;
//       console.log(cor)
//   }
// }

/************************ AND CONFIGURATION *************************************/

/************************* THEY ELIMINATE *********************************************/
function finalizaProcesso(){//  REMOVE TODOS OS PROCESSOS
    var LimparVetor=VetorProcessos.length;
    if(VetorProcessos[0]==undefined){
       alert('Não existe Processo!')
    }else { 
        if (confirm('Tem certeza que deseja remover todos os Processos?'))
        VetorProcessos.splice(0,LimparVetor)//Limpar todos os processos           
        
     if(VetorProcessos[0]==undefined){
        $( "#execucao div" ).empty();// limpar
        $( "#pronto div" ).empty();// limpar
        $( "#fila-de-processos div" ).empty();//limpar
        $( "#fila-de-processos div" ).append('<p id="not-exist"><span>Não</span> existe Processo!</p>');

     }
  }
}

var capturando = "";
function removerProcesso(ID) {//remove processo pelo input
    //capturando = document.getElementById('valor').value;
        //$("#PIDfinalizado").empty()
        capturando=ID;
        $("#PIDfinalizado").append('<p class="removidoManual">'+capturando+'</p>'+'<br/>');
        var valoRemover;
        if(VetorProcessos[0]!=undefined){
            for(indice=0;indice<VetorProcessos.length;indice++){
                if (capturando==VetorProcessos[indice].ID) {
                     //valoRemover=VetorProcessos[indice];
                     VetorProcessos.splice(indice,1);
                     //console.log(valoRemover);
                      alert('Removido')
                   }
            }
        }else { alert('Não existe Processo!') }
}
/************************* END THEY ELIMINATE ********************/

var recursivaMudaEstado = function () {
    imprimir();
    imprimirTermino();
    imprimirPCB();
    setTimeout(recursivaMudaEstado,3000);
} 
recursivaMudaEstado();


// METODO DE FUNCINAMENTO DE SIMULADO DE PROCESSOS:
/*
 - Os processos estão sendo armazenados em um vetor e sendo ordenados,
 - por enquanto o criterio de ordenação é apenas a prioridade randomica que ele tem quando
 - são criados, sendo assim, o processo na posição 0 é o com maior prioridade
 - Vetor[0] -> PROCESSO É ELIMINADO - ESPERA
 - Vetor[1] -> PROCESSO EM ESTADO DE EXECUÇÃO (somento o da posição 1, apenas um em execução)
 - Vetor[2] ->PROCESSOS EM ESTADO DE PRONTO (imprime todos a partir do indice 02,
    pois seus anteriores são o que estão no estado de ESPERA e EXECUÇÃO)
 - PROCESSOS TERMINADOS: imprime o vetor (VETORPROCESSOSTERMINADOS)
*/

// BUGZINHO NA ORDENAÇÃO: porque os processos estão com mesmo valor de prioridade

// VALOR 02 ESTADO DE PRONTO
// VALOR 01 ESTADO DE EXECUÇÃO
// VALOR 0 ESTADO DE ESPERA

//tempo de crição do processo e tempo aparecendo na interface
//cor aleatoria para cada processo
//SQL para salvar o contexto de Hardware
// sempre que houver uma mudança nos vetores, seja inclusão ou remoção é preciso ter
//o ordenamento do vetor
//LISTAR NO ESTADO TERMINO, TODOS OS PROCESSOS QUE FOREM SENDO FINALIZADOS