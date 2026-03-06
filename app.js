const memoForm = document.getElementById('memo-form');
const memoInput = document.getElementById('memo-input');
const memoList = document.getElementById('memo-list');
const emptyMessage = document.getElementById('empty-message');

const MEMO_STORAGE_KEY = 'simple-memo-items';

function loadMemos() {
  const raw = localStorage.getItem(MEMO_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveMemos(memos) {
  localStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(memos));
}

function updateEmptyState() {
  emptyMessage.classList.toggle('hidden', memoList.children.length > 0);
}

function createMemoElement(text, index) {
  const item = document.createElement('li');
  item.className = 'memo-item';

  const content = document.createElement('span');
  content.textContent = text;

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'delete-btn';
  removeButton.textContent = '削除';
  removeButton.addEventListener('click', () => {
    const memos = loadMemos();
    memos.splice(index, 1);
    saveMemos(memos);
    renderMemos();
  });

  item.append(content, removeButton);
  return item;
}

function renderMemos() {
  const memos = loadMemos();
  memoList.innerHTML = '';

  memos.forEach((memo, index) => {
    memoList.appendChild(createMemoElement(memo, index));
  });

  updateEmptyState();
}

memoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = memoInput.value.trim();
  if (!value) return;

  const memos = loadMemos();
  memos.push(value);
  saveMemos(memos);

  memoInput.value = '';
  memoInput.focus();
  renderMemos();
});

renderMemos();
