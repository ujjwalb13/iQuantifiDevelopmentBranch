HOST='waws-prod-bn1-001.ftp.azurewebsites.windows.net'
TARGETFOLDER='/site/wwwroot'
SOURCEFOLDER='../release'

lftp -e "
open $HOST
user $IQUI_USER $IQUI_PASS
mirror --reverse --delete --verbose $SOURCEFOLDER $TARGETFOLDER
bye
"
