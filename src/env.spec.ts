describe('env', () => {
  it('should have a MONGODB_URI', () => {
    expect(process.env.MONGODB_URI).toBeDefined();
  });
  it('should have a ACCESS_TOKEN_SECRET', () => {
    expect(process.env.ACCESS_TOKEN_SECRET).toBeDefined();
  });
  it('should have a ACCESS_TOKEN_EXPIRATION', () => {
    expect(process.env.ACCESS_TOKEN_EXPIRATION).toBeDefined();
  });
  it('should have a REFRESH_TOKEN_SECRET', () => {
    expect(process.env.REFRESH_TOKEN_SECRET).toBeDefined();
  });
  it('should have a REFRESH_TOKEN_EXPIRATION', () => {
    expect(process.env.REFRESH_TOKEN_EXPIRATION).toBeDefined();
  });
});
