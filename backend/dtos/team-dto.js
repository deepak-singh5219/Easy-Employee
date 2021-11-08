const LeaderDto = require('./leader-dto');
class TeamDto {
    id;
    name;
    description;
    image;
    admin;
    status;
    leader;

    constructor(team){
        this.id = team._id;
        this.name = team.name;
        this.description = team.description;
        this.image = team.image && `${process.env.BASE_URL}storage/images/teams/${team.image}`,
        this.admin = team.admin;
        this.status = team.status && team.status.charAt(0).toUpperCase()+ team.status.slice(1);
        this.leader = team.leader && team.leader.name && new LeaderDto(team.leader);
    }

}

module.exports = TeamDto;