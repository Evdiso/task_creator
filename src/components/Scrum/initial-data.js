const initialData = {
	tasks: {
		'task-1': {id: 'task-1', content: 'Some content 1'},
		'task-2': {id: 'task-2', content: 'Some content 2'},
		'task-3': {id: 'task-3', content: 'Some content 3'},
		'task-4': {id: 'task-4', content: 'Some content 4'},
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'Новые задачи',
			tasksIds: ['task-1','task-2','task-3','task-4']
		},
		'column-2': {
			id: 'column-2',
			title: 'В процессе',
			tasksIds: []
		},
		'column-3': {
			id: 'column-3',
			title: 'Завершенные',
			tasksIds: []
		}
	},
	columnOrder: ['column-1','column-2','column-3']
};

export default initialData
