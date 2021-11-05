
class LeaderDto{
    id;
    name;
    username;
    email;
    image;
    type;
    address;
    constructor(user)
    {
        console.log(user)
        this.id = user._id,
        this.name = user.name,
        this.username = user.username,
        this.email = user.email,
        this.image = user.image && `${process.env.BASE_URL}storage/images/profile/${user.image}`,
        this.type = user.type,
        this.address = user.address
    }

}

module.exports = LeaderDto;