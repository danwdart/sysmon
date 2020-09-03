# Task
Aim: create a frontend and backend for visualising monitoring of
    servers, much like Nagios or Munin.

    Objectives:
        Frontend for monitor
            REST API client with caching and waiting
            Promise based, parallel requests to prevent loading times reaching too high
            Refresh graph every... 30s? 5m? Any preference?
            Nice GUI to display results:
                Statuses: Big coloured boxes
                Statistics: graphs, charts as appropriate to particular data type

        OAuth client
            in Backend to hide secret key
            Keys stored in env as recommended in 12factor

        Backend for authentication to the REST API to get an access token & cache in memory.
            For each service log response,
                If host.enabled not true, ignore.
                if status_code = 501, display grey box with host.name with "Not Implemented" with total_alerts if exists.
                if status_code = 5xx and not 501, display red box with host.name with error concerned, and total_alerts if exists.
                if status_code = 4xx, display host.name as yellow and error concerned, and total_alerts if exists.
                if status_code = 2xx, for each x of nodes
                    if x.status_code = 501, display grey box with web_host with "Not Implemented" with total_alerts if exists.
                    if x.status_code = 5xx and not 501, display red box with web_host with error concerned, and total_alerts if exists.
                    if x.status_code = 4xx, display web_host as yellow and error concerned, and total_alerts if exists.
                    if x.status_code = 2xx, for each y of checks
                        Display name, message and started_at in an appropriate graph or text in box format, with the colour indicated as y.state, or grey if it doesn't exist.

Notes and assumptions made, with improvement ideas:
    Server up to ES2017 - rather than what Node v12 requires - presumably to test on earlier versions of Node (think I heard 8 mentioned?)
    Client up to ES5
    No JS compilers but SCSS compilers allowed
    Versions given should be strictly adhered to.
    Extract numbers for service desk personnel where relevant
    npm/grunt used for building frontend + JS
    Demonstrative testing where relevant
    Use Passport for the oauth token
    Secrets stored in .env file not committed (and as many magic numbers as possible)
    jQuery to be used for the frontend - easier than XHR etc when target is ES5
    No CI/CD
    No Serverless
    Check on status 5s after endpoint makes it available
    Refresh every 30s (configurable)
    Cache where possible
    Hogan chosen for templating as I have understood that Handlebars/Mustache is preferable to pug.
    XHTML1.1 style chosen also, as this is especially needed for older clients on unsupported browsers - could have done it in HTML5 style though, which I'm more used to now. This is why all the extraneous nonsense that new browsers ignore is included.
    Sass chosen over scss for its presence in the existing stack.
    Grunt chosen to make live reloading and scss compiling more familiar to devs (although could all be done in npm)
    ES Modules not used as Node 12 did not properly support them and nor do the intended browsers.
    No modules (not even CommonJS for f/e) since the task required no compilation and needed to work in old browsers.
    JS/CSS dependencies installed & copied rather than CDN'd (although this is possible) because of demonstration/familiarity/ease of modification/upgrade notifications. Also instead of minifying (because it counts as compiling) which could also be done, and would in any other project.
    No fancy was chosen for time/complexity reasons, but there's no reason it couldn't be added. A simple .htaccess will do enough for demonstration purposes.
    No error pages because there's not going to be any point visiting any other page in this demo anyway, as it's all self contained.
    jQuery compatibility was checked and says latest supports IE9, and latest MS browser that doesn't support ES6 is any IE, so the target will be IE11.
    Mobile support will thus come secondarily (although always nice to have!).
    SASS used instead of SCSS or similar as project required it
    Extensibility: environment variables used extensively for easy editing.
    Live-reload: could be added at currently minimal benefit, but would just waste time I could be making it look prettier.
    axios used instead of passport as the proxy is minimal.
    I'm not bothering with source maps of upstream code, so there may be some warnings about that.
    Discovered far too late that the upstream does not support CORS, so do have to proxy the requests through the backend.
    I think desktop notifications when things die might be good.
    A couple of sample tests added quickly.
    Although I could have used any flashy plugin, lack of canvas support in IE and time required me to use Bootstrap <progress>-like bars.
    I dared not consider what might be considered good so I could only graph those with %s.
    I did notice that the API was returning 500s inside of 200s which I put down to an error with it, and haven't updated the logic to show.
    Cross-browser testing was skipped but only because of time constraints. Bootstrap ensures usually this is OK anyway.
    I don't consider the end result particularly pretty but it could be made so - for the influx of data I had to deal with <details> elements etc. The only thing graphable was percentages (because totals did not exist) - so had to be text for the rest. Minimalist <progress>-like Bootstrap bars I quite like though.
    Frontend calculation should be functional and be testable - or maybe even put into the backend.

Problems:
    grunt-copy adds a full stop to the end of copied files whereas grunt-contrib-copy does not, and while I made a mental note to delete it from package.json I didn't until I stumbled upon it. I should have deleted it earlier and not seen the problem.
        Lesson: remove unneccessary deps immediately
    Copying popper.js broke the site, solution was to use the umd version.
        Lesson: Copy and modify from official docs if using non-modules.

Notes:
    All services are reported on, some do not implement the status report yet, some do.

## Considerations
An /app structure was considered but deemed for the time being to be uneccessary.