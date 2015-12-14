class Reindeer
  @@reindeer = []

  attr_accessor :score, :name, :duration, :wait, :speed

  def initialize(name, speed, duration, wait)
    @name = name
    @speed = speed
    @duration = duration
    @wait = wait
    @score = 0
  end

  def save
    @@reindeer.push(self)
  end

  def self.all
    @@reindeer
  end

  def cycle_length
    duration + wait
  end

  def self.reset_scores
    all.each do |r|
      r.score = 0
    end
  end

  def distance_travelled_per_cycle
    speed * duration
  end

  def distance_travelled(time)
    distance = 0

    (time / cycle_length).floor.times do
      distance += distance_travelled_per_cycle
    end

    for i in 1..(time % cycle_length) do
      distance += speed if i <= duration
      i += 1
    end

    distance
  end

  def add_score
    @score = score + 1
  end

  def self.furthest_travelled(time)
    distance = 0

    all.each do |r|
      distance_travelled = r.distance_travelled(time)
      if distance_travelled > distance
        distance = distance_travelled
      end
    end

    distance
  end

  def self.give_score_at_increment(time)
    furthest = furthest_travelled(time)

    all.each do |r|
      if r.distance_travelled(time) == furthest
        r.add_score
      end
    end
  end

  def self.highest_score
    score = 0

    all.each do |r|
      if r.score > score
        score = r.score
      end
    end

    score
  end

  def self.tally_score(time)
    for i in 1..time
      give_score_at_increment(i)
    end
  end
end

File.open('input.txt', 'r') do |f|
  reindeer = []
  distance = 0

  f.each_line do |line|
    data = line.split(" ")
    Reindeer.new(data[0], data[3].to_i, data[6].to_i, data[13].to_i).save
  end

  # Part 1
  puts Reindeer.furthest_travelled(2503)

  # Part 2
  Reindeer.tally_score(2503)
  puts Reindeer.highest_score

end
