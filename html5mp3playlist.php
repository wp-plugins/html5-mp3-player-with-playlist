<?php
/*
Plugin Name: HTML5 MP3 Playlist Player
Plugin URI: http://www.svnlabs.com/joomla-html5-audio-playlist-player
Description: Allows Wordpress users to easily use HTML5 <audio> the element enable native audio playback within the browser. It supports all browsers i.e. Firefox, Chrome, Safari, IE and Opera. HTML5 Audio Player with Playlist, Repeat, Random, Stream Seek, Volume Control, Timer, Next, Previous, Play-Pause option.
Date: 2012, April, 18
Author: Sandeep Verma
Author URI: http://www.svnlabs.com/
Version: 1.07
*/

/*
Author: Sandeep Verma
Website: http://www.svnlabs.com
Copyright 2012 SVN Labs Softwares, Jaipur, India All Rights Reserved.

*/



function html5mp3playlist_add_admin()
{
    add_options_page('HTML5MP3Playlist', 'html5mp3playlist', 8, 'html5mp3playlist', 'html5mp3playlist_options');
}


$html5mp3playlist_sizes = array(
                        1 =>array(
                            "name"    =>"Default",
                            "w"        =>"566",
                            "h"        =>"207"
                        )
                    );
                    



 
function html5mp3playlist_content($content) {
    global $html5mp3playlist_sizes;
     
    $size     = intval(get_option('html5mp3playlist_size'));
    
     
     
    $content = '<iframe src="http://demo.svnlabs.com/html5player/meth/" frameborder="0" marginheight="0" marginwidth="0" scrolling="no" width="566" height="225"></iframe>';
    
    
    
    return $content;
}




/*
 * The Options page for EasyTube. We rock... thanks.
 */
function html5mp3playlist_options()
{    
    global $html5mp3playlist_sizes;
    
    $options = array("");
    
    if($_POST['action'] == 'save')
    {
        update_option('html5mp3playlist_size', $_POST['html5mp3playlist_size']);
         
        foreach($options as $o)
        {    
            
            $val = !empty($_POST[$o]);
            update_option($o, $val);
        }
    }
    
     
    $size     = get_option('html5mp3playlist_size');
     
     
    
     
    
    
?>
<!-- EasyTube - its the way forward -->
 <div class="wrap">
     
    <h2>HTML5 MP3 Player with Playlist Options</h2>
    <div style="float: right; width: 300px; padding: 10px; text-align:center; background-color: #FFFFCC; border: 1px solid #000">
    <h3 style="text-align:center">Do you like this plugin? <br />I want to make it better?</h3>
    
    
    <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
<input type="hidden" name="cmd" value="_s-xclick">
<input type="hidden" name="hosted_button_id" value="RET8NPWS3BXQG">
<input type="image" src="https://www.paypal.com/en_GB/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal � The safer, easier way to pay online.">
<img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1">
</form>
<br />

<a href="http://www.scriptrr.com/html5-mp3-player-with-playlist-for-website/" target="_blank">Get fully customized HTML5 MP3 Player with Playlist for Website</a>     
    
    <p><a href="http://www.svnlabs.com/concentrate" title="concentrate"><strong>Concentrate</strong></a> <strong>&gt;</strong> <a href="http://www.svnlabs.com/observe" title="observe"><strong>Observe</strong></a> <strong>&gt;</strong> <a href="http://www.svnlabs.com/imagine" title="imagine"><strong>Imagine</strong></a> <strong>&gt;</strong> <a href="http://www.svnlabs.com/launch" title="launch"><strong>Launch</strong></a></p>
    </div>
     
    
    <form action="?page=html5mp3playlist" method="POST">
    <input type="hidden" name="action" value="save"/>
    <p class="submit"><input name="Submit" value="Update Options &raquo;" type="submit"></p>
    
    
     <strong>Uses</strong>: [html5mp3playlist]<br />
<br />
    
        <table class="optiontable">    
             
            <tr>
                <th scope="row">
                
                    Plugin Dimension
                </th>
                <td>
                    <select name="html5mp3playlist_size">
                    <?php foreach($html5mp3playlist_sizes as $key=>$s){ ?>
                        <option value="<?php echo $key ?>" <?php if($key == $size){ echo "selected=\"selected\"";} ?>><?php echo $s['name']; ?></option>
                    <?php } ?>
                    </select>
                </td>
            </tr>
            
            
             
             
            
        </table>
        <p class="submit"><input name="Submit" value="Update Options &raquo;" type="submit"></p>
    </form>
</div>
<?php    
}

/*
 * Install EasyTube options. We like options, they give us variety in life.
 */
function html5mp3playlist_install()
{ 
     
    add_option('html5mp3playlist_size',7, "Defines video size");
    
    
     
     
}


add_filter('the_content','html5mp3playlist_content');
//add_filter('the_excerpt','html5mp3playlist_content');
add_action('admin_menu', 'html5mp3playlist_add_admin');

register_activation_hook(__FILE__,"html5mp3playlist_install");

?>