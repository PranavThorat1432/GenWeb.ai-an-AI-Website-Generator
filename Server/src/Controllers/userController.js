
export const getCurrentUser = async (req, res) => {
    try {
        if(!req.user) {
            return res.status(401).json({
                message: 'User not found!'
            });
        }
        return res.status(200).json(req.user);

    } catch (error) {
        return res.status(500).json({
            message: `Get Current User Error: ${error}`
        });
    }
};
