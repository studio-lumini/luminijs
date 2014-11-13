#!/bin/bash

cd ../bin

if [[ -f lumini.js ]]
then
	rm lumini.js
fi
touch lumini.js

cd ../src

cat 'google/GATracker.class.js' >> ../bin/lumini.js
#echo -e '\n' >> ../bin/lumini.js
cat 'google/Stats.class.js' >> ../bin/lumini.js

cat 'mvc/AbstractObject.class.js' >> ../bin/lumini.js

cat 'mvc/stage/StageSizeEvent.class.js' >> ../bin/lumini.js
cat 'mvc/stage/StageSizeModel.class.js' >> ../bin/lumini.js
cat 'mvc/stage/StageSizeController.class.js' >> ../bin/lumini.js

cat 'mvc/AbstractView.class.js' >> ../bin/lumini.js

cat 'mvc/selection/SelectionEvent.class.js' >> ../bin/lumini.js
cat 'mvc/selection/SelectionModel.class.js' >> ../bin/lumini.js
cat 'mvc/selection/SelectionController.class.js' >> ../bin/lumini.js

cat 'mvc/selection/page/PageSelectionEvent.class.js' >> ../bin/lumini.js
cat 'mvc/selection/page/PageSelectionModel.class.js' >> ../bin/lumini.js
cat 'mvc/selection/page/PageSelectionController.class.js' >> ../bin/lumini.js

cat 'mvc/selection/page/swfaddress/SWFAddressSelectionController.class.js' >> ../bin/lumini.js
cat 'mvc/selection/page/history/HistorySelectionController.class.js' >> ../bin/lumini.js

cat 'mvc/selection/AbstractSelectionContentView.class.js' >> ../bin/lumini.js
cat 'mvc/selection/PreviousButtonView.class.js' >> ../bin/lumini.js
cat 'mvc/selection/NextButtonView.class.js' >> ../bin/lumini.js

cat 'utils/Cookie.class.js' >> ../bin/lumini.js
cat 'utils/UrlToolbox.class.js' >> ../bin/lumini.js
cat 'utils/social/SocialSharer.class.js' >> ../bin/lumini.js
cat 'utils/detection/DeviceDetection.class.js' >> ../bin/lumini.js
cat 'utils/detection/BrowserDetection.class.js' >> ../bin/lumini.js

cat 'mvc/code/CodeEvent.class.js' >> ../bin/lumini.js
cat 'mvc/code/CodeModel.class.js' >> ../bin/lumini.js
cat 'mvc/code/CodeController.class.js' >> ../bin/lumini.js
cat 'mvc/code/FlushingCodeController.class.js' >> ../bin/lumini.js
cat 'mvc/code/KeyboardCodeController.class.js' >> ../bin/lumini.js

cat 'mvc/facebook/FacebookModel.class.js' >> ../bin/lumini.js
cat 'mvc/facebook/FacebookController.class.js' >> ../bin/lumini.js
cat 'mvc/facebook/FacebookEvent.class.js' >> ../bin/lumini.js

cat 'mvc/twitter/TwitterEvent.class.js' >> ../bin/lumini.js
cat 'mvc/twitter/TwitterModel.class.js' >> ../bin/lumini.js
cat 'mvc/twitter/TwitterController.class.js' >> ../bin/lumini.js

cat 'mvc/menu/AbstractMenuItemView.class.js' >> ../bin/lumini.js

cat 'utils/AnimationHelper.class.js' >> ../bin/lumini.js

cat 'utils/drupal/vo/Field.class.js' >> ../bin/lumini.js
cat 'utils/drupal/vo/Entity.class.js' >> ../bin/lumini.js
cat 'utils/drupal/vo/User.class.js' >> ../bin/lumini.js
cat 'utils/drupal/DrupalServices.class.js' >> ../bin/lumini.js
