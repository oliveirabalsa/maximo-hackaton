export default interface Tasks {
  _id: {
    $oid: string;
  };
  title: string;
  description: string;
  user_id: string;
  timestamps: true;
}
