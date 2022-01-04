function newsGetter(dom,rest_url) {
    var domArea = dom;
    $.ajax({
        type: 'GET',
        url: rest_url,
        dataType: 'json'
    }).done(function (wordpressapi) {
        var lng = wordpressapi.length;
        if (lng > 4) {
            lng = 4;
        };
        for (var i = 0; i < lng; i++) {
            var title = wordpressapi[i]['title']['rendered'];
            var link = wordpressapi[i]['link'];
            var excerpt = wordpressapi[i]['excerpt']['rendered'];
            var category = wordpressapi[i]['_embedded']['wp:term'][0][0]['name'];
            var catslug = ' cat' + wordpressapi[i]['_embedded']['wp:term'][0][0]['slug'];
            if (wordpressapi[i]['_embedded']['wp:featuredmedia']) {
                var image = wordpressapi[i]['_embedded']['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
                var image_html = '<div class="image">' + '<img src="' + image + '" alt="' + title + '-image" />' + '</div>';
                var image_css = 'image-on';
            } else {
                var image_html = '';
                var image_css = 'image-off';
            }
            var dateData = new Date(wordpressapi[i]['date']);
            yy = dateData.getYear();
            if (yy < 2000) {
                yy += 1900;
            }
            mm = dateData.getMonth() + 1;
            if (mm < 10) {
                mm = "0" + mm;
            };
            dd = dateData.getDate();
            if (dd < 10) {
                dd = "0" + dd;
            };
            var postDate = yy + '-' + mm + '-' + dd;

            var html =
                '<div class="grid-index">'+
                '<a href="' + link + '" class="'+ image_css +'">'+
                '<div class="item">'+
                image_html +
                '<div class="blog-detail">'+
                '<div class="titleset">'+
                '<div class="title">' + title + '</div>'+
                '</div>'+
                '<div class="date-cat">'+
                '<div class="date">' + postDate + '</div>'+
                '<div class="category"><span class="catblog'+ catslug +'">'+ category +'</span></div>'+
                '</div>'+
                '</div>'+
                '<div class="singleblogIcon">'+'<img src="/wp-content/themes/kobacway/img/singleblog-linkbtn.svg">'+'</div>'+
                '</div>'+
                '</a>'+
                '</div>';
            $(domArea).append(html);
        }
    }).fail(function (wordpressapi) {
        $(domArea).append("データの読み込みに失敗しました。");
    });
};