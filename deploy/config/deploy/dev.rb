# Development server deployment configuration

set :deploy_to, "/srv/zumba"
set :branch, "master"
set :keep_releases, 3
set :domain_config, 'zumba-proto.hugeops.com'

role :web, "zumba-proto.hugeops.com"                          # Your HTTP server, Apache/etc
role :app, "zumba-proto.hugeops.com"                          # This may be the same as your `Web` server
role :db,  "zumba-proto.hugeops.com", :primary => true # This is where Rails migrations will run