(($) => {
    let isExpanded = false;
    const button = $("<button class='youtube-chat-magnifier-button expand'></button>");
    const internalBodyStyles = $(`
<style>
    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn&display=swap');
    .yt-live-chat-text-message-renderer {
        font-size: 23px;
        font-family: 'Vazirmatn', sans-serif;
    } 
    
    .yt-live-chat-text-message-renderer #author-name {
        margin-left: 15px;
    }
</style>`);
    const mainBodyStyles = $(`
<style>
    .youtube-chat-magnifier-button {
        position: relative;
        top: 0;
        left: 0;
    }
    
    .youtube-chat-magnifier-button.expand:before {
        content: "+"
    }
    
    .youtube-chat-magnifier-button.expand {
        width: 30px;    
    }
    
    .youtube-chat-magnifier-button.collapse:before {
        content: "-";
    }
    
    #columns.chat-magnified #secondary {
        position: absolute;
        left: 0;
        width: 100%;
        background-color: #ffffff;
    }
    
    #columns.chat-magnified #chat {
        height: ${$(window).height() - 100}px;
    }
</style>
    `)


    // const magnify = () => {
    //     const chat = $("#chat");
    //     const internalBody = chat.find("iframe").contents().find("body");
    //
    //     if (!isExpanded) {
    //         chat.css("position", "absolute")
    //             .css("top", "0")
    //             .css("left", "0")
    //             .css("width", "100%")
    //             .css("height", `${$(window).height()}px`)
    //             .css("z-index", 3000);
    //
    //         const rectangle = chat.offset();
    //         button.offset(rectangle)
    //             .text("-");
    //
    //
    //         internalBody.append(styles).attr("dir", "rtl");
    //
    //         isExpanded = true;
    //     } else {
    //         chat.css("position", "inherit")
    //             .css("height", "inherit");
    //         const rectangle = chat.offset();
    //         button.offset(rectangle)
    //             .text("+");
    //
    //         styles.remove();
    //         internalBody.attr("dir", "ltr");
    //
    //         isExpanded = false;
    //     }
    // }
    //
    // const addMagnifier = () => {
    //     const chat = $("#chat");
    //     const rectangle = chat.offset();
    //     button
    //         .offset(rectangle)
    //         .css("position", "absolute")
    //         .css("z-index", "10000")
    //         .attr("type", "button")
    //         .click(magnify);
    //     $(document.body).append(button);
    // }

    const toggleMagnifier = () => {
        const internalBody = $("#chat").find("iframe").contents().find("body");
        if(isExpanded) {
            button.removeClass("collapse").addClass("expand");
            $("#columns").removeClass("chat-magnified");
            internalBodyStyles.remove();
            internalBody.attr("dir", "ltr")
            isExpanded = false;
        } else {
            button.removeClass("expand").addClass("collapse");
            $("#columns").addClass("chat-magnified");
            internalBody.prepend(internalBodyStyles);
            internalBody.attr("dir", "rtl");
            isExpanded = true;
        }
    }

    const addMagnifier = () => {
        $('#chat').prepend(button);
        $('body').prepend(mainBodyStyles);
        button.click(toggleMagnifier);
    }

    const boot = () => {
        if ($("#chat")?.length > 0) {
            addMagnifier();
        } else {
            window.setTimeout(boot, 100);
        }
    }

    boot();
})(jQuery)