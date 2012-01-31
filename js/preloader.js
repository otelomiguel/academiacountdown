
////
// main images preloader feature script
//	browser visual components will be hidden by a main div until all main
//	images are ready to be displayed. this way, not visual artifacts will happen
//	while website is loading
////
var imgs = "0_panel_down_piece.png,0_panel_up_piece.png,1_panel_down_piece.png,1_panel_up_piece.png,2_panel_down_piece.png,2_panel_up_piece.png,3_panel_down_piece.png,3_panel_up_piece.png,4_panel_down_piece.png,4_panel_up_piece.png,5_panel_down_piece.png,5_panel_up_piece.png,6_panel_down_piece.png,6_panel_up_piece.png,7_panel_down_piece.png,7_panel_up_piece.png,8_panel_down_piece.png,8_panel_up_piece.png,9_panel_down_piece.png,9_panel_up_piece.png,";
imgs = imgs.split(",");
var totalimages = 20;
var counterimgs = 0;
imagelist=new Array(totalimages);

for(k=0 ; k<totalimages ; k++)
{    
    imagelist[k]=new Image();
    imagelist[k].onload = function()
	{       
		counterimgs++;
        if (counterimgs == imgs.length-1)
        {
			$("#preload").hide();
        }
    }
    imagelist[k].src="img/"+imgs[k];
}