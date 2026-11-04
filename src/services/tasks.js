import { api } from './api';

// Laravel devolve { data: {...} } quando usa o controller usa JsonResource.
// Se devolver o modelo direto, usamos o próprio corpo da resposta.
const unwrapData = (response) => response.data?.data ?? response.data;

export async function listTasks({ signal } = {}) {
    return unwrapData(await api.get('/tarefas', { signal }));
}

export async function createTask(data) {
    return unwrapData(await api.post('/tarefas', data));
}

export async function updateTask(id, changes) {
    return unwrapData(await api.put(`/tarefas/${id}`, changes));
}

export async function deleteTask(id) {
    return unwrapData(await api.delete(`/tarefas/${id}`));
}