# Multistage Configuration

require 'capistrano/ext/multistage'
set :stages, ["dev"]
set :default_stage, "dev"

set :application, "Zumba Prototype"
set :repository,  "ssh://git@stash.hugeinc.com:7999/zum/zumba-wireframes.git"
set :scm, :git
set :branch, "master"
set :keep_releases, 3
set :deploy_to, "/srv/zumba"
# User Information
set :user, "deploymentdan" # Add Server Name
set :apacheuser, "www-data"

# Customizations
ssh_options[:forward_agent] = true
default_run_options[:pty] = true
set :scm_verbose, true
set :use_sudo, true
set :sudo_prompt, ''
# set :deploy_via, :remote_cache


before "deploy:update", "basic:changedeploymentperms"
before "deploy:update", "basic:fix_permissions"

after "deploy:create_symlink", "basic:changewwwperms"
after "basic:changewwwperms", "deploy:cleanup"

namespace :basic do
	
	task :fix_permissions do
		run "whoami" # Cause Crapistrano
		run "#{sudo} mkdir -p #{release_path}"
		run "#{sudo} chown -R #{user} #{release_path}"	
	end

    task :changedeploymentperms do
        run "#{sudo} chown -R #{user}:#{user} #{deploy_to}/"
    end

    task :changewwwperms do
        run "#{sudo} chown -R #{apacheuser}:#{apacheuser} #{deploy_to}/"
    end
end	
