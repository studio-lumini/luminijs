// This class is only to be used with Drupal Lumini Share module.
function DrupalSocialSharer()
{
}

DrupalSocialSharer.shareFacebook = function()
{
	var title = Drupal.settings.share.share_admin_facebook_title;
	var imageLink = Drupal.settings.share.share_admin_facebook_image;
	var link = Drupal.settings.share.share_admin_facebook_url;
	var description = Drupal.settings.share.share_admin_facebook_description;
	SocialSharer.shareFacebook(title, imageLink, link, description);
};

DrupalSocialSharer.shareTwitter = function()
{
	var hashtags = Drupal.settings.share.share_admin_twitter_hashtags;
	var url = Drupal.settings.share.share_admin_twitter_url;
	var text = Drupal.settings.share.share_admin_twitter_title;
	SocialSharer.shareTwitter(url, text, hashtags);
};
