import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, updateProfil } from '../../api/UserAPI';
import { useCsrfToken } from '../../helpers/UseCsrfToken';
import { useSelector } from 'react-redux';
import { selectUser } from '../../slices/UserSlice';
import validateAndCleanData from '../../helpers/DataValidator';

const MemberManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const csrfToken = useCsrfToken();
  const currentUser = useSelector(selectUser);
  const userAllowedFields = ['email', 'status', 'date_of_birth', 'adult'];

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setLoading(false);
      });
  }, [refreshKey]);

  const handleDeleteUser = (userId, userStatus) => {
    if (currentUser.infos.userID === userId) {
      alert("Vous ne pouvez pas supprimer votre propre compte.");
      return;
    }
    if (userStatus === 'superAdmin') {
      alert("Vous ne pouvez pas supprimer un compte super administrateur.");
      return;
    }
    if (currentUser.infos.status !== 'superAdmin' && userStatus === 'admin') {
      alert("Seul un super administrateur peut supprimer un compte administrateur.");
      return;
    }
    deleteUser(userId, csrfToken)
      .then(() => {
        setRefreshKey(prevKey => prevKey + 1);
      })
      .catch(error => {
        console.error('Erreur lors de la suppression de l’utilisateur:', error);
      });
  };

  const handleChangeStatus = (userId, newStatus) => {
    const data = { status: newStatus };
    const cleanedData = validateAndCleanData(data, ['status']);

    if (currentUser.infos.userID === userId) {
      alert("Vous ne pouvez pas modifier votre propre statut.");
      return;
    }

    updateProfil(cleanedData, userId, csrfToken)
      .then(() => {
        setRefreshKey(prevKey => prevKey + 1);
      })
      .catch(error => {
        console.error('Erreur lors de la modification du statut de l’utilisateur:', error);
      });
};

  if (loading) return <p>Chargement...</p>;

  return (
    <>
      <h2>Gestion des membres</h2>
      <table>
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Statut</th>
                  <th>Adulte</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userID}>
                <td data-label="ID">{user.userID}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Statut">
                  {currentUser.infos.status === 'superAdmin' ? (
                    user.status === 'superAdmin' ? (
                      user.status
                    ) : (
                      <select 
                        value={user.status}
                        onChange={(e) => handleChangeStatus(user.userID, e.target.value)} 
                        disabled={currentUser.infos.userID === user.userID || user.status === 'superAdmin'}>
                        <option value="admin">Admin</option>
                        <option value="utilisateur">Utilisateur</option>
                      </select>
                    )
                  ) : (
                    user.status
                  )}
                </td>
                <td data-label="Adulte">{user.adult ? 'Oui' : 'Non'}</td>
                <td data-label="Actions">
                  {user.status !== 'superAdmin' && (
                    <button onClick={() => handleDeleteUser(user.userID, user.status)}>
                      Supprimer
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </>
  );
};

export default MemberManagement;
