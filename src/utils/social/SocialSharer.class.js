function SocialSharer() {
}

/**
 * Shares content on Facebook.
 * @param url
 *        The url to share.
 */
SocialSharer.shareFacebook = function (url) {
    url = encodeURIComponent(url);
    var url = "https://www.facebook.com/sharer/sharer.php?u=" + url;

    return SocialSharer.popup(url, 600, 368, "menubar=no,scrollbars=no,statusbar=no");
};

/**
 * Shares content on Pinterest.
 * @param url
 * @param media
 * @param description
 */
SocialSharer.sharePinterest = function (url, media, description) {
    url = encodeURIComponent(url);
    media = encodeURIComponent(media);
    var text = encodeURIComponent(description);

    var queryString = "url=" + url + "&media=" + media + "&description=" + text;
    var url = "//pinterest.com/pin/create/button?" + queryString;
    return SocialSharer.popup(url, 600, 350, "menubar=no,scrollbars=no,statusbar=no");
};

/**
 * Shares content on Twitter
 * @param url
 *        A fully-qualified HTTP or HTTPS-based URL.
 * @param text
 *        UTF-8 Tweet body text.
 * @param hashtags
 *        Add context to the pre-prepared status update by appending #hashtags. Omit the "#" symbol and separate multiple hashtags with commas.
 * @param via (optional)
 *        A screen name to associate with the tweet. Omit the "@" symbol.
 */
SocialSharer.shareTwitter = function (url, text, hashtags, via) {
    var queryString = '';

    if (url) {
        queryString += '&url=' + encodeURIComponent(url);
    }
    if (text) {
        queryString += '&text=' + encodeURIComponent(text);
    }
    if (hashtags) {
        hashtags = encodeURIComponent(hashtags);
        queryString += "&hashtags=" + hashtags;
    }
    if (via) {
        via = encodeURIComponent(via);
        queryString += "&via=" + via;
    }

    var url = 'http://twitter.com/intent/tweet?' + queryString;
    return SocialSharer.popup(url, 600, 350, 'menubar=no,scrollbars=no,statusbar=no');
};

/**
 * Uses Twitter user intent.
 * @param screen_name
 *        Twitter user screen name.
 */
SocialSharer.twitterIntentUser = function (screen_name) {
    var url = "https://twitter.com/intent/user?screen_name=" + screen_name;
    return SocialSharer.popup(url, 600, 500, "menubar=no,scrollbars=no,statusbar=no");
};

/**
 * Shares a link on Tumblr.
 * @param link
 *        The link to share.
 * @param name (optional)
 *        The name of the link.
 * @param description (optional)
 */
SocialSharer.shareTumblrLink = function (link, name, description) {
    var url = "http://www.tumblr.com/share/link?url=" + encodeURIComponent(link);
    if (name)
        url += "&name=" + encodeURIComponent(name);
    if (description)
        url += "&description" + encodeURIComponent(description);
    return SocialSharer.popup(url, 600, 500, "menubar=no,scrollbars=no,statusbar=no");
};

/**
 * Shares a link on LinkedIn
 * @param url
 *        The permanent link to the article. Must be URL encoded.
 * @param title
 *        The title of the article. Must be URL encoded
 * @param source
 *        The source of the article. Must be URL encoded. Example: Wired Magazine
 * @param summary
 *        A brief summary of the article. Must be URL encoded. Longer titles will be truncated gracefully with ellipses.
 */

SocialSharer.shareLinkedIn = function (url, title, source, summary) {
    var url = "http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(url);

    url += "&title=" + encodeURIComponent(title);
    url += "&summary=" + encodeURIComponent(summary);
    url += "&source=" + encodeURIComponent(source);

    return SocialSharer.popup(url, 600, 500, "menubar=no,scrollbars=no,statusbar=no");
};

/**
 * Shares an url on Google plus.
 * @param url
 *        The URL of the page to share. This value should be url encoded.
 * @param h1 (optional)
 *        The language code for the locale to use on the Google+ sharing page.
 */
SocialSharer.shareGoogle = function (url, h1) {
    var url = "https://plus.google.com/share?url=" + encodeURIComponent(url);
    if (h1)
        url += "&h1=" + encodeURIComponent(h1);
    return SocialSharer.popup(url, 600, 500, "menubar=no,scrollbars=no,statusbar=no");
};

//private
SocialSharer.popup = function (url, width, height, options) {
    var top = (screen.height - height) / 2;
    var left = (screen.width - width) / 2;
    return window.open(url, "", "top=" + top + ",left=" + left + ",width=" + width + ",height=" + height + "," + options);
};
