import { connect } from '../app/dbConfig/dbConfig';

const UserModel = {
  async create(user) {
    try {
      const {
        username,
        email,
        password,
        isVerified = false,
        isAdmin = false,
        forgotPasswordToken = null,
        forgotPasswordTokenExpiry = null,
        verifyToken = null,
        verifyTokenExpiry = null,
      } = user;

      const conn = await connect();
      const [result] = await conn.execute(
        `INSERT INTO users (
          username, email, password, isVerified, isAdmin,
          forgotPasswordToken, forgotPasswordTokenExpiry,
          verifyToken, verifyTokenExpiry
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          username,
          email,
          password,
          isVerified,
          isAdmin,
          forgotPasswordToken,
          forgotPasswordTokenExpiry,
          verifyToken,
          verifyTokenExpiry,
        ]
      );

      return result.insertId;
    } catch (error) {
      console.error('UserModel.create error:', error);
      throw error;
    }
  },

  async findByEmail(email) {
    try {
      const conn = await connect();
      const [rows] = await conn.execute('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      console.error('UserModel.findByEmail error:', error);
      throw error;
    }
  },

  async findByUsername(username) {
    try {
      const conn = await connect();
      const [rows] = await conn.execute('SELECT * FROM users WHERE username = ?', [username]);
      return rows[0];
    } catch (error) {
      console.error('UserModel.findByUsername error:', error);
      throw error;
    }
  },

  async updateVerifyToken(email, token, expiry) {
    try {
      const conn = await connect();
      const [result] = await conn.execute(
        `UPDATE users SET verifyToken = ?, verifyTokenExpiry = ? WHERE email = ?`,
        [token, expiry, email]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('UserModel.updateVerifyToken error:', error);
      throw error;
    }
  },

  async markVerified(email) {
    try {
      const conn = await connect();
      const [result] = await conn.execute(
        `UPDATE users SET isVerified = true, verifyToken = NULL, verifyTokenExpiry = NULL WHERE email = ?`,
        [email]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('UserModel.markVerified error:', error);
      throw error;
    }
  },
};

export default UserModel;
