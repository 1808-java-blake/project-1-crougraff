
export function authorization(...roles: number[]) {
    return (req, resp, next) => {
      const user = req.session.user;
      console.log(user);
      if(!user) {
            resp.sendStatus(401);
        return;
      }
      const hasPermission = roles.some(role => {
        if(Number(user.userRoleId) === role)
          return true;
        else 
          return false;
      })
      if(hasPermission) 
        next();
      else 
        resp.sendStatus(403);
    }
  }