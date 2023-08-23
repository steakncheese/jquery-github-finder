$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;
        
        // Make request to GitHub
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data: {
                client_id:'CLIENT_ID_API',
                client_secret:'CLIENT_SECRET_API',
            }
        }).done(function(user){
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data: {
                    client_id:'CLIENT_ID_API',
                    client_secret:'CLIENT_SECRET_API',
                    sort:'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                $.each(repos, function(index,repo){
                    $('#repos').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-7 text">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="label label-default text">Forks: ${repo.forks_count}</span>
                                    <span class="label label-primary text">Watchers: ${repo.watchers_count}</span>
                                    <span class="label label-success text">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-default text">Repo Page</a>
                                </div>
                            </div>
                        </div>
                    `)
                })
            })
            $('#profile').html(`
            <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  ${user.name}
                </button>
              </h2>
              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                <div class="row">
                  <div class="col-md-3">
                    <img class="thumbnail avatar" src="${user.avatar_url}">
                    <a target="_blank" class="btn btn-primary btn-block btn-profile" href="${user.html_url}">View Profile</a>
                  </div>
                  <div class="col-md-9">
                  <span class="label label-default">Public Repos: ${user.public_repos}</span>
                  <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                  <span class="label label-success">Followers: ${user.followers}</span>
                  <span class="label label-info">Following: ${user.following}</span>
                  <br></br>
                  <ul class="list-group">
                    <li class="list-group-item">Company: ${user.company}</li> 
                    <li class="list-group-item">Website/blog: ${user.blog}</li> 
                    <li class="list-group-item">Location: ${user.location}</li> 
                    <li class="list-group-item">Member Since: ${user.created_at}</li> 
                  </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <h3 class="page-header text">Latest Repo</h3>
          <div id="repos"></div>
            `);
        })
    })
})