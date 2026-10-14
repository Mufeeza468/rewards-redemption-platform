const BASE_URL = "http://localhost:3000/api";

export const getUserPoints = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/points`);
  return res.json();
};

export const getRewards = async () => {
  const res = await fetch(`${BASE_URL}/rewards`);
  return res.json();
};

export const redeemReward = async (userId, rewardId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/redeem?reward_id=${rewardId}`, {
    method: "POST",
  });
  return res.json();
};

export const getRedemptions = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/redemptions`);
  return res.json();
};