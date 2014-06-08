
var redraw, g, renderer;
// 中文
/* only do all this when document has finished loading (needed for RaphaelJS) */
window.onload = function() {
    
    var width = $(document).width() - 20;
    var height = $(document).height() - 60;
       
    // var width = 800;
    // var height = 600;
    
    g = new Graph();
    g.edgeFactory.template.style.directed = true;
    /* add a simple node */
    // g.addNode("strawberry");
    // g.addNode("cherry");

    /* add a node with a customized label */
    // g.addNode("1", { label : "Tomato" });

	
    /* add a node with a customized shape 
       (the Raphael graph drawing implementation can draw this shape, please 
       consult the RaphaelJS reference for details http://raphaeljs.com/) */
   var render = function(r, n) {
       var label = r.text(50, 25, n.label)
       console.log(n)
       console.log(r)
       // .attr({opacity:1});
        /* the Raphael set is obligatory, containing all you want to display */
       var set = r.set().push(
           r.rect(0, 0, 100, 50).attr({"fill": "#FFE064", "stroke-width": 1, r : "9px"}))
           .push(label);
        /* make the label show only on hover */
        // label.animate({opacity:0},300);
       // set.hover(function(){ label.animate({opacity:1,"fill-opacity":1}, 500); }, function(){ label.animate({opacity:0},300); });

    //    tooltip = r.set()
    //        .push(
    //            r.rect(0, 0, 90, 30).attr({"fill": "#fec", "stroke-width": 1, r : "9px"})
    //        ).push(
    //            r.text(25, 15, "overlay").attr({"fill": "#000000"})
    //        );
    //    for(i in set.items) {
    //        set.items[i].tooltip(tooltip);
    //    };
	   // set.tooltip(r.set().push(r.rect(0, 0, 30, 30).attr({"fill": "#fec", "stroke-width": 1, r : "9px"})).hide());
       return set;
   };

   var render = function(r, n) {
            /* the Raphael set is obligatory, containing all you want to display */
            
            // strlen = n.label.length
            var set = r.set().push(
                /* custom objects go here */
                r.rect(n.point[0]-0, n.point[1]-13, 60, 45).attr({"fill": "#FFF", r : "9px","stroke-width": "2px","stroke":"#3BA3F5"})).push(
                r.text(n.point[0]+20, n.point[1] + 12, (n.label || n.id) ) );
            return set;
        };
	
//     g.addNode("1", {
//         label : "meat and greed" ,
// //          filling the shape with a color makes it easier to be dragged 
// //         /* arguments: r = Raphael object, n : node object */
//        render : render
//     });



    g.addNode("job1",{
        label : "job1" ,
        render : render
    })    
    g.addNode("job2",{
        label : "job2" ,
        render : render
    })    
    g.addNode("job3",{
        label : "job3" ,
        render : render
    })    
    g.addNode("job4",{
        label : "job4" ,
        render : render
    })

    g.addNode("root", {
    label : "root" ,
    render : render
    });

    g.addNode("job5",{  render : render })
    g.addNode("job6",{  render : render })
    g.addNode("job7",{  render : render })
    g.addNode("job8",{  render : render })
    g.addNode("job9",{  render : render })
    g.addNode("job10",{  render : render })



       // g.addNode("Wheat", {
    /* filling the shape with a color makes it easier to be dragged */
    /* arguments: r = Raphael object, n : node object */
       //     shapes : [ {
       //             type: "rect",
       //             x: 100,
       //             y: 100,
       //             width: 25,
       //             height: 25,
       //             stroke: "#f00"
       //         }, {
       //             type: "text",
       //             x: 30,
       //             y: 40,
       //             text: "Dump"
       //         }],
       //     overlay : "<b>Hello <a href=\"http://wikipedia.org/\">World!</a></b>"
       // });

    st = { 
        directed: true, 
        // label : "next","label-style" : {
        //         "font-size": 20
        //     }
        };

    // g.addEdge("root", "job1", st);
    // g.addEdge("job1", "job2", st);
    // g.addEdge("job2", "job3", st);
    // g.addEdge("job2", "job4", st);  

    g.addEdge("root", "job1");
    g.addEdge("job1", "job2");
    g.addEdge("job2", "job3");
    g.addEdge("job2", "job4");

    g.addEdge("job4", "job5");
    g.addEdge("job5", "job6");
    g.addEdge("job5", "job7");
    g.addEdge("job5", "job8");


    g.addEdge("job8", "job9");
    g.addEdge("job8", "job10");
    g.addEdge("job4", "job7");
    
    // g.addEdge("Wheat", "node2", st);

    /* connect nodes with edges */
    // g.addEdge("strawberry", "cherry");
    // g.addEdge("cherry", "apple");
    // g.addEdge("cherry", "apple")
    // g.addEdge("1", "id35");
    // g.addEdge("penguin", "id35");
    // g.addEdge("penguin", "apple");
    // g.addEdge("start", "id35");

    /* a directed connection, using an arrow */
    // g.addEdge("1", "cherry", { directed : true } );
    
    /* customize the colors of that edge */
    // g.addEdge("id35", "apple", { stroke : "#bfa" , fill : "#56f", label : "Meat-to-Apple" });
    
    /* add an unknown node implicitly by adding an edge */
    // g.addEdge("strawberry", "apple");

    // g.removeNode("1");

    /* layout the graph using the Spring layout implementation */
    // var layouter = new Graph.Layout.Spring(g);
    
    /* draw the graph using the RaphaelJS draw implementation */
    var layouter = new Graph.Layout.Ordered(g, topological_sort(g));
    
    renderer = new Graph.Renderer.Raphael('canvas', g, width, height);
    
    redraw = function() {
        layouter.layout();
        renderer.draw();
    };
    hide = function(id) {
        g.nodes[id].hide();
    };
    show = function(id) {
        g.nodes[id].show();
    };
    //    console.log(g.nodes["kiwi"]);
};

