(($) => {
    let isExpanded = false;
    const button = $("<button>+</button>");
    const styles = $(`
<style>
    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn&display=swap');
    .yt-live-chat-text-message-renderer {
        font-size: 23px;
        font-family: 'Vazirmatn', sans-serif;
    } 
</style>`);


    const magnify = () => {
        const chat = $("#chat");
        const internalBody = chat.find("iframe").contents().find("body");

        if(!isExpanded) {
            chat.css("position", "absolute")
                .css("top", "0")
                .css("left", "0")
                .css("width", "100%")
                .css("height", `${$(window).height()}px`)
                .css("z-index", 3000);

            const rectangle = chat.offset();
            button.offset(rectangle)
                .text("-");



            internalBody.append(styles).attr("dir", "rtl");

            isExpanded = true;
        } else {
            chat.css("position", "inherit")
                .css("height", "inherit");
            const rectangle = chat.offset();
            button.offset(rectangle)
                .text("+");

            styles.remove();
            internalBody.attr("dir", "ltr");

            isExpanded = false;
        }
    }

    const addMagnifier = () => {
        const chat = $("#chat");
        const rectangle = chat.offset();
        button
            .offset(rectangle)
            .css("position", "absolute")
            .css("z-index", "10000")
            .attr("type", "button")
            .click(magnify);
        $(document.body).append(button);
    }


    const boot = () => {
        if($("#chat")?.length > 0) {
            addMagnifier();
        } else {
            console.log("not found, waiting");
            window.setTimeout(boot, 100);
        }
    }

    boot();
})(jQuery)